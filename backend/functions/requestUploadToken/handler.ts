import createHttpError from "http-errors";
import { FromSchema } from "json-schema-to-ts";
import { v4 as uuidv4 } from "uuid";

import inputSchema from "./schema";
import FileUploadToken from "../../services/S4/libs/FileUploadTokenEntity";

const getUploadToken = async (event: FromSchema<typeof inputSchema>) => {
  const { name } = event.pathParameters;

  if (!name.includes("allowMe")) {
    throw new createHttpError.Forbidden();
  }

  const uploadToken = uuidv4();

  await FileUploadToken.put({
    modelName: "FileUploadToken",
    id: uploadToken,
    ressourceName: "ANTD_UPLOAD_LIST",
    ressourceId: name,
    email: name,
  });

  return { uploadToken };
};

export const main = getUploadToken;
