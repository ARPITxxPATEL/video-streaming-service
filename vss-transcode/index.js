const AWS = require('aws-sdk');
require("dotenv").config();
const { hlsConvert } = require('./process');

const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

const QUEUE_URL = process.env.AWS_SQS_QUEUE_URL;

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
