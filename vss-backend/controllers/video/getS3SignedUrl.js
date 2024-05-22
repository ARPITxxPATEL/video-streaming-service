const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialize the S3 client
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const getS3SignedUrl = (req, res) => {
    const videoId = uuidv4();
    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `videos/${videoId}.mp4`,
        Expires: 5 * 60, // URL expiration time in seconds
        ContentType: 'video/mp4' // Adjust content type if needed
    };

    s3.getSignedUrl('putObject', s3Params, (err, url) => {
        if (err) {
            console.error("Error generating signed URL", err);
            return res.status(500).send({
                message: "Error generating signed URL"
            });
        }

        res.status(200).send({
            videoId: videoId,
            uploadUrl: url
        });
    });
};

module.exports = getS3SignedUrl;
