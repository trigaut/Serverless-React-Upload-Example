# File upload example with Serverless, AWS, React and Antd

This repository is an example of application for the serverless stack [S4](https://github.com/theodo/S4). It contains a small React app with an `Uploads` component, wrapping [Ant design Upload component](https://ant.design/components/upload/), to safely upload/download files to/from an Amazon S3 Bucket using S4 as a backend.

## Requirements

- [node 12](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/getting-started/install)
- [aws CLI > 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [Serverless CLI](https://www.serverless.com/framework/docs/getting-started/)
- An AWS account and profile

## Quick start

- Clone this repository
- Run the following command at the root of the project to download S4 repository in the backend folder

```bash
sls create --template-url https://github.com/theodo/S4 --path backend
```

- Run `yarn` in the backend folder

- Import the four lambdas in the `examples/allowMe` folder at the begining of the `serverless.ts` file

```ts
import {
  requestUploadToken,
  getDownloadUrl,
  listFiles,
  onFileUploaded,
} from "./examples/allowMe/functions/config";
```

- Add them in the functions attributes of the serverlessConfiguration

```ts
functions: {
    getSignedUploadUrl,
    getSignedDownloadUrl,
    dispatchFileUpload,
    requestUploadToken,
    getDownloadUrl,
    listFiles,
    onFileUploaded,
  },
```

- Run `yarn sls deploy --aws-profile YOUR_PROFILE` in the backend folder to deploy S4

- Create a .env file in the frontend folder containing

```bash
REACT_APP_API_BASE_URL=https://{API_GATEWAY_ID}.execute-api.{REGION}.amazonaws.com/api
```

- Run `yarn start` in the frontend folder
