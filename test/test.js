/*jshint esversion: 6 */
(function () {
    'use strict';

    const fs = require('fs');
    const path = require(`path`);
    const frs = fs.createReadStream(path.join(__dirname, `./test.json`));
    const MiniS3upload = require('../index.js');

    let s3p = new MiniS3upload(
        `Your_BucketName`,
        `Your region`,
        `Your AWS access key ID`,
        `Your AWS secret access key`,
        {"custom": "This obj is custom S3 Options`"}
    );

    function printResult(rsErr, S3err, data) {
        console.log(`rsErr : ${rsErr}`);
        console.log(`S3err : ${S3err}`);
        console.log(`data : ${JSON.stringify(data, null, 1)}`);
    }

    //Stream Example
    s3p.uploadFile(`emp/`, `a`, `application/json`, frs, `public-read`, printResult);

    //Any Object Except Stream Example

    //The JSON
    s3p.uploadFile(`emp/`, `a`, `application/json`, JSON.stringify({
        "example": "example"
    }), `private`, printResult);


    //The music
    /*fs.readFile(`./a.flac`, (err, data) =>
        s3p.uploadFile(`emp/`, `a`, `audio/x-flac`, data, `public-read`, printResult));
    */

    //The image

    /*fs.readFile(`./a.jpg`, (err, data) => {
        s3p.uploadFile(`emp/`, `a`, `image/jpeg`, data, `public-read`, (rsErr, S3err, data) => {
            console.log(`rsErr : ${rsErr}`);
            console.log(`S3err : ${S3err}`);
            console.log(`data : ${JSON.stringify(data, null, 1)}`);
        });
    });*/

    //The String
    s3p.uploadFile(`emp/`, `a`, `text/plain`, `This is a String example`, `public-read`, (rsErr, S3err, data) => {
        console.log(`rsErr : ${rsErr}`);
        console.log(`S3err : ${S3err}`);
        console.log(`data : ${JSON.stringify(data, null, 1)}`);
    });

}());