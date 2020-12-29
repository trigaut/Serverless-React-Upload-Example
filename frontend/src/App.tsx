import React from "react";
import { Uploads } from "components";

export const App: React.FC = () => (
  <Uploads
    getUploadToken={async () => "mockToken"}
    getDownloadUrl={async () => "mockUrl"}
  />
);
