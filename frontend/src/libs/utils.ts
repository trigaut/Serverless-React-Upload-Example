const ACCEPTED_FILES_BY_EXTENSION = {
  pdf: ".pdf",
  xls: ".xls",
  xlsx: ".xlsx",
  ppt: ".ppt",
  pptx: ".pptx",
  docx: ".docx",
  jpg: ".jpg",
  png: ".png",
  doc: ".doc",
  odp: ".odp",
  ods: ".ods",
  odt: ".odt",
  mp4: ".mp4",
};

const MAX_FILE_SIZE_BY_FORMAT = [
  { regexp: new RegExp("image/(\\w+)"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.docx"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.doc"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.pptx"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.ppt"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.xlsx"), maxSize: 10e6 },
  { regexp: new RegExp("application/(.+)\\.xls"), maxSize: 10e6 },
  { regexp: new RegExp("application/pdf"), maxSize: 10e6 },
  { regexp: new RegExp("video/(\\w+)"), maxSize: 100e6 },
];

export const getFileSizeLimit = (filetype: string): number => {
  for (const { regexp, maxSize } of MAX_FILE_SIZE_BY_FORMAT) {
    if (regexp.exec(filetype)) {
      return maxSize;
    }
  }
  return 0;
};

export const allFileTypes = Object.values(ACCEPTED_FILES_BY_EXTENSION).join(
  ","
);
