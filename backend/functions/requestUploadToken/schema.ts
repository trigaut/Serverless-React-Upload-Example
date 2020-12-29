export default {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
  },
  required: ["pathParameters"],
} as const;
