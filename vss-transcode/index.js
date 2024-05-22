const AWS = require('aws-sdk');
require("dotenv").config();
const { hlsConvert } = require('./process');
const mysql = require('mysql');


const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

const QUEUE_URL = process.env.AWS_SQS_QUEUE_URL;


// RDS Database Connection
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT_NUMBER,
    database: process.env.RDS_DATABASE_NAME
});
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    } else {
        console.log('Connected to the RDS database');
    }
});


async function pollSQS() {
    try {
        const params = {
            QueueUrl: QUEUE_URL,
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
                    destPrefixKey: event.Records[0].s3.object.key.replace(/\.mp4/, "").replace('videos', 'processed')
                };
                console.log("Message received: ", config);
                await hlsConvert(config);

                // Update the video status in the database
                const videoId = config.key.split('/').pop().replace('.mp4', '');
                await updateVideoStatus(videoId, 'processed');

                // Delete the message after processing
                const deleteParams = {
                    QueueUrl: QUEUE_URL,
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
    while (true) {
        await pollSQS();
        // Wait for 6 second before polling again
        await new Promise(resolve => setTimeout(resolve, 6000));
    }
}

main().catch(error => {
    console.error('Error in main function:', error);
});
