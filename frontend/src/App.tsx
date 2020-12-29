import React from "react";
import { Uploads } from "components";
import { request } from "components/client";

export const App: React.FC = () => (
  <Uploads
    getUploadToken={async () => {
      const { uploadToken } = (await request(
        "get",
        `/request-upload-token?name=allowMe`
      )) as { uploadToken: string };
      return uploadToken;
    }}
    getDownloadUrl={async (fileId: string) => {
      const { downloadUrl } = (await request(
        "get",
        `/get-download-url?fileId=${fileId}&name=allowMe`
      )) as { downloadUrl: string };
      return downloadUrl;
    }}
  />
);
