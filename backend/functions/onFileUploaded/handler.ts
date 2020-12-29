import "source-map-support/register";

import { File } from "../../libs/File";

const onFileUploaded = async (event: unknown): Promise<void> => {
  const { id: filePrefix, filename, fileSize, bucketName } = event[
    "detail"
  ].payload;

  const file = { filePrefix, filename, fileSize, bucketName };

  await File.put({ pk: "File", file });
};

export const main = onFileUploaded;
