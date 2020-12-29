export default {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        fileId: { type: "string" },
        name: { type: "string" },
      },
      required: ["fileId", "name"],
    },
  },
  required: ["pathParameters"],
} as const;
