export const requestUploadToken = {
  handler: "functions/requestUploadToken/handler.main",
  environment: {
    TOKEN_TABLE_NAME: "${self:custom.tokenTableName}",
  },
  events: [
    {
      httpApi: {
        method: "GET",
        path: "/api/request-upload-token",
      },
    },
  ],
};
