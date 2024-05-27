const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const { uploadToS3 } = require('./utils');

async function createThumbnail(config, inputFilePath, tempDir, timestamp = '00:00:03') {
    const thumbnailPath = path.join(tempDir, `${config.videoId}.jpeg`);

    try {
        // Capture frame using ffmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(inputFilePath)
                .screenshots({
                    timestamps: [timestamp],
                    filename: `${config.videoId}.jpeg`,
                    folder: tempDir,
                    size: '1920x1080'
                })
                .on('end', resolve)
                .on('error', reject);
        });

        // Upload thumbnail to S3
        await uploadToS3(config.thumbnailBucketName, `${config.videoId}.jpeg`, thumbnailPath, 'image/jpeg');

        console.log('Thumbnail captured and uploaded successfully.');
    } catch (error) {
        console.error('Error capturing thumbnail:', error);
        throw error;
    }
}

module.exports = { createThumbnail };


