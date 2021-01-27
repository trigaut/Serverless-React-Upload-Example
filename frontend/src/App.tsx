import React from "react";
import { useAsync } from "react-use";
import { Spin } from "antd";

import { Uploads } from "components";
import { request } from "libs/client";

type S4File = {
  filePrefix: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  bucketName: string;
};

export const App: React.FC = () => {
  const { value: uploadedFiles } = useAsync(async () => {
    const { files } = (await request("get", `/files?name=allowMe`)) as {
      files: S4File[];
    };
    return files;
  });

  if (!uploadedFiles) {
    return <Spin />;
  }
  return (
    <Uploads
      initialFiles={uploadedFiles?.map(
        ({ filePrefix, fileName, fileSize, fileType }) => ({
          uid: filePrefix,
          name: fileName,
          size: fileSize,
          type: fileType,
        })
      )}
      getUploadToken={async () => {
        const { uploadToken } = (await request(
          "get",
          `/upload-token?name=allowMe`
        )) as { uploadToken: string };
        return uploadToken;
      }}
      getDownloadUrl={async (fileId: string) => {
        const { downloadUrl } = (await request(
          "get",
          `/download-url?fileId=${fileId}&name=allowMe`
        )) as { downloadUrl: string };
        return downloadUrl;
      }}
    />
  );
};
