const fs = require('fs');
const AWS = require('aws-sdk');
// require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const path = require('path');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

async function uploadToS3(bucket, key, filePath, contentType) {
    const fileStream = fs.createReadStream(filePath);
    return s3.upload({
        Bucket: bucket,
        Key: key,
        Body: fileStream,
        ContentType: contentType
    }).promise();
}

async function downloadFromS3(bucket, key, tempDir) {
    const inputFilePath = path.join(tempDir, path.basename(key));
    const s3Object = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    fs.writeFileSync(inputFilePath, s3Object.Body);
    return inputFilePath;
}

module.exports = { uploadToS3, downloadFromS3 };