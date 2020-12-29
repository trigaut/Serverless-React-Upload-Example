import createHttpError from "http-errors";
import { FromSchema } from "json-schema-to-ts";
import LambdaClient from "aws-sdk/clients/lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import jsonValidator from "@middy/validator";

import inputSchema from "./schema";
import { File } from "../../libs/File";

const lambda = new LambdaClient();

const getFileUrl = async (event: FromSchema<typeof inputSchema>) => {
  const { fileId, name } = event.pathParameters;

  if (!name.includes("allowMe")) {
    throw new createHttpError.Forbidden();
  }

  const { Item: file } = await File.get({ pk: "File", filePrefix: fileId });

  if (!file) {
    throw new createHttpError.NotFound();
  }

  const { FunctionError, Payload: data } = await lambda
    .invoke({
      FunctionName: process.env.GET_DOWNLOAD_URL_LAMBDA_ARN,
      Payload: JSON.stringify({
        filePrefix: fileId,
        filename: file.filename,
      }),
    })
    .promise();

  if (FunctionError || !data) {
    throw new Error(JSON.parse(data as string).errorMessage);
  }
  const { downloadUrl } = JSON.parse(data as string);

  return { downloadUrl };
};

const middyfiedHandler = middy(getFileUrl);
middyfiedHandler.use(jsonBodyParser());
middyfiedHandler.use(jsonValidator({ inputSchema }));
middyfiedHandler.use(httpErrorHandler());

export const main = middyfiedHandler;
