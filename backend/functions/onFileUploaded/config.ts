export const addFile = {
  handler: "functions/onFileUploaded/handler.main",
  environment: {
    TOKEN_TABLE_NAME: "${self:custom.tokenTableName}",
  },
  events: [
    {
      eventBridge: {
        eventBus: "${self:custom.eventBridgeArn}",
        pattern: {
          source: ["s4-events"],
          "detail-type": ["ANTD_UPLOAD_LIST_FILE_UPLOADED"],
        },
      },
    },
  ],
};
