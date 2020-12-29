export const getDownloadUrl = {
  handler: "functions/getDownloadUrl/handler.main",
  environment: {
    TOKEN_TABLE_NAME: "${self:custom.tokenTableName}",
  },
  events: [
    {
      httpApi: {
        method: "GET",
        path: "/api/get-download-url",
      },
    },
  ],
};
