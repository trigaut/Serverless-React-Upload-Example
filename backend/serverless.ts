import { AWS } from "@serverless/typescript";

// import { getAttachmentDownloadUrl } from "./functions/config";

const serverlessConfiguration: AWS = {
  service: "antdUploadList",
  frameworkVersion: ">=2.4.0",
  plugins: ["serverless-webpack", "serverless-pseudo-parameters"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "eu-west-1",
    environment: { AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1" },
    httpApi: {
      payload: "2.0",
      cors: {
        allowedOrigins: ["*"],
        allowedHeaders: ["Content-Type", "Origin"],
        allowedMethods: ["POST", "OPTIONS"],
      },
    },
  },
  functions: {},
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    tokenTableName: {
      "Fn::ImportValue": "TokenTableName",
    },
  },
};

module.exports = serverlessConfiguration;
