##Description

This module can easy to use readStream upload file to Your AWS S3.

This module use the AWS official SDK.


## Installation

`npm install S3_stream_upload`

## Usage

``` js

const S3 = require('S3_stream_upload');

let s3client = new S3(
        `Your_BucketName`,
        `Your region`,
        `Your AWS access key ID`,
        `Your AWS secret access key`,
        S3OptionObject
    );
```

## Upload Your File or any Data by Stream

use

**s3client.uploadFile**

This API will upload your file by Stream.

*parameter*
* upload_path {string} : The file will upload to this path.
* filename {string} : Just filename.
* mimeType {string} : MIME type. ex：application/json
* data {readStream or any} : Your need to upload Data.
* ACL {string} : was same as AWS S3 ACL.
* callback {function} : when upload finish will call.
    * RSerror : was same as ReadStream Error. [see nodejs document](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_readable)
    * S3error : was same as API AWS_S3.uploadFile error Msg. [see AWS S3 Official Doc](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property).
    * data {Object}: was same as api AWS_S3.uploadFile Data. [see AWS S3 Official Doc](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property).

``` js
//Example 1: upload ReadStream

const fs = require('fs');
const fsRS = fs.createReadStream(`yourfile.json`));

s3client.uploadFile(
    `Your_Bucket_TargetPath`,
    `myJson.json`,
    `application/json`,
    fsRS,
    `public-read`,
    (rsErr, S3err, data)=>{
    //other code...
});

//Example 2: upload any Except Stream

s3client.uploadFile(
    `Your_Bucket_TargetPath`,
    `myJson.json`,
    `application/json`,
    JSON.stringify({"example": "example"}),
    `public-read`,
    (rsErr, S3err, data)=>{
    //other code...
});

```

## License

MIT