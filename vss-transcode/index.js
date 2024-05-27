const AWS = require('aws-sdk');
require("dotenv").config();
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const { hlsConvert } = require('./hlsConvert');
const { createThumbnail } = require('./createThumbnail');
const { downloadFromS3 } = require('./utils');


const sqs = new AWS.SQS({ region: process.env.AWS_REGION });


// RDS Database Connection
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT_NUMBER,
    database: process.env.RDS_DATABASE_NAME
});

async function pollSQS() {
    // Create a temporary directory to store the downloaded video
    const tempDir = fs.mkdtempSync(path.join(process.cwd(), 'ffmpeg-'));

    try {
        const params = {
            QueueUrl: process.env.AWS_SQS_QUEUE_URL,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20,
        };
        const data = await sqs.receiveMessage(params).promise();

        if (data.Messages && data.Messages.length > 0) {
            for (const message of data.Messages) {
                const event = JSON.parse(message.Body);
                const config = {
                    bucketName: event.Records[0].s3.bucket.name,
                    key: event.Records[0].s3.object.key,
                    destPrefixKey: event.Records[0].s3.object.key.replace(/\.mp4/, "").replace('videos', 'processed'),
                    thumbnailBucketName: process.env.AWS_THUMBNAIL_BUCKET_NAME,
                    videoId: event.Records[0].s3.object.key.split('/').pop().replace('.mp4', ''),
                };
                console.log("Message received: ", config);

                // Download the video from S3
                const inputFilePath = await downloadFromS3(config.bucketName, config.key, tempDir);

                // Process the video
                await hlsConvert(config, inputFilePath, tempDir);

                // Create a thumbnail for the video
                await createThumbnail(config, inputFilePath, tempDir);                

                // Update the video status in the database
                const videoId = config.key.split('/').pop().replace('.mp4', '');
                await updateVideoStatus(videoId, 'processed');

                // Delete the message after processing from the SQS queue
                const deleteParams = {
                    QueueUrl: process.env.AWS_SQS_QUEUE_URL,
                    ReceiptHandle: message.ReceiptHandle
                };
                await sqs.deleteMessage(deleteParams).promise();
            }
        } else {
            console.log('No messages to process.');
        }
    } catch (error) {
        console.error('Error polling SQS:', error);
    }
    finally{
        fs.rmSync(tempDir, { recursive: true });
    }
}

async function updateVideoStatus(videoId, status) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE videos SET status = ? WHERE video_id = ?';
        connection.query(query, [status, videoId], (error, results) => {
            if (error) {
                console.error('Error updating video status:', error);
                return reject(error);
            }
            console.log('Video status updated:', videoId, status);
            resolve(results);
        });
    });
}

async function main() {
    await connection.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            process.exit(1);
        } else {
            console.log('Connected to the RDS database');
        }
    });
    while (true) {
        await pollSQS();
        // Wait for 6 second before polling again
        await new Promise(resolve => setTimeout(resolve, 6000));
    }
}

main().catch(error => {
    console.error('Error in main function:', error);
});
