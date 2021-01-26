import React, { useRef, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadFile, RcFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";

import { S3Fields, SignedUrl } from "./types";
import { allFileTypes, getFileSizeLimit } from "./utils";
import { request } from "./client";

export type UploadsProps = {
  initialFiles?: UploadFile[];
  getUploadToken: () => Promise<string>;
  getDownloadUrl: (fileId: string) => Promise<string>;
  acceptedFileTypes?: string;
};

export const Uploads: React.FC<UploadsProps> = ({
  initialFiles = [],
  getUploadToken,
  getDownloadUrl,
  acceptedFileTypes = allFileTypes,
}) => {
  const uploadFields = useRef<S3Fields>();
  const filePrefixByUid = useRef<Record<string, string>>({});

  const [files, setFiles] = useState<UploadFile[]>(initialFiles);

  const uploadFile = async (file: RcFile) => {
    const maxSize = getFileSizeLimit(file.type);

    if (maxSize < file.size) {
      message.error("File is too large");
      return "error";
    }

    try {
      const uploadToken = await getUploadToken();

      filePrefixByUid.current[file.uid] = uploadToken;

      const { url, fields } = (await request(
        "get",
        `/signed-upload-url?uploadToken=${uploadToken}&fileType=${file.type}`
      )) as SignedUrl;

      uploadFields.current = {
        ...fields,
        "Content-Type": file.type,
        key: `${uploadToken}/\${fileName}`,
      };

      return url;
    } catch (error) {
      return "error";
    }
  };

  const downloadFile = async (file: UploadFile) => {
    if (!getDownloadUrl) return;
    try {
      const downloadUrl = await getDownloadUrl(file.uid);
      window.open(downloadUrl, "_blank");
    } catch {}
  };

  return (
    <>
      <Upload
        fileList={files}
        showUploadList={{ showDownloadIcon: true, showRemoveIcon: false }}
        accept={acceptedFileTypes}
        data={async () => uploadFields.current}
        action={uploadFile}
        onDownload={downloadFile}
        onChange={({ file, event }) => {
          if (event || !file) return;
          switch (file.status) {
            case "uploading":
            case "error":
              setFiles([...files, file]);
              break;
            case "done": {
              const filePrefix = filePrefixByUid.current[file.uid];
              if (!filePrefix) return;
              setFiles([...files, { ...file, uid: filePrefix }]);
              break;
            }
            default:
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};
