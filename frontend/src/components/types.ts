export interface S3Fields {
  Policy: string;
  "X-Amz-Algorithm": string;
  "X-Amz-Credential": string;
  "X-Amz-Date": string;
  "X-Amz-Security-Token": string;
  "X-Amz-Signature": string;
  bucket: string;
  key: string;
  "x-amz-storage-class": string;
  "Content-Type"?: string;
}

export interface SignedUrl {
  url: string;
  fields: S3Fields;
}
