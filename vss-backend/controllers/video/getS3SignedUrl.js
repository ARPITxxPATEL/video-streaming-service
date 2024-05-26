const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

// Initialize the S3 client
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
});

const getS3SignedUrl = async (req, res) => {
    const videoId = uuidv4();
    const bucketName = process.env.S3_BUCKET_NAME;
    const objectKey = `videos/${videoId}.mp4`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        ContentType: 'video/mp4' // Adjust content type as needed
    });

    try {
        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // URL expiration time in seconds (5 minutes)

        res.status(200).send({
            videoId: videoId,
            uploadUrl: uploadUrl
        });
    } catch (error) {
        console.error("Error generating signed URL", error);
        res.status(500).send({
            message: "Error generating signed URL"
        });
    }
};

module.exports = getS3SignedUrl;
