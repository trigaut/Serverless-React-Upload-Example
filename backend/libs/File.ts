import { Entity } from "dynamodb-toolbox";

import { TokenTable } from "../services/S4/resources/dynamodb";

export const File = new Entity({
  name: "File",
  attributes: {
    pk: { partitionKey: true, hidden: true },
    filePrefix: { sortKey: true },
    filename: "string",
    fileSize: "string",
    bucketName: "string",
  },
  table: TokenTable,
});
