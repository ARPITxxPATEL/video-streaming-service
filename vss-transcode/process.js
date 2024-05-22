const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const fs = require('fs');
const path = require('path');
const os = require('os');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const resolutions = [
    { name: '360p', width: 640, height: 360, bitrate: '800k', maxrate: '856k', bufsize: '1200k' },
    { name: '480p', width: 842, height: 480, bitrate: '1400k', maxrate: '1498k', bufsize: '2100k' },
    { name: '720p', width: 1280, height: 720, bitrate: '2800k', maxrate: '2996k', bufsize: '4200k' },
    { name: '1080p', width: 1920, height: 1080, bitrate: '5000k', maxrate: '5350k', bufsize: '7500k' }
];

async function uploadToS3(bucket, key, filePath, contentType) {
    const fileStream = fs.createReadStream(filePath);
    return s3.upload({
        Bucket: bucket,
        Key: key,
        Body: fileStream,
        ContentType: contentType
    }).promise();
}

function generateFFmpegCommand(resolution, inputFilePath, outputDir) {
    return new Promise((resolve, reject) => {
        const outputFilePath = path.join(outputDir, `${resolution.name}.m3u8`);
        ffmpeg(inputFilePath)
            .addOptions([
                '-profile:v main',
                `-vf scale=w=${resolution.width}:h=${resolution.height}:force_original_aspect_ratio=decrease`,
                '-c:a aac',
                '-ar 48000',
                '-b:a 128k',
                '-c:v h264',
                '-crf 20',
                '-g 48',
                '-keyint_min 48',
                '-sc_threshold 0',
                `-b:v ${resolution.bitrate}`,
                `-maxrate ${resolution.maxrate}`,
                `-bufsize ${resolution.bufsize}`,
                '-hls_time 10',
                `-hls_segment_filename ${outputDir}/${resolution.name}_%03d.ts`,
                '-hls_playlist_type vod',
                '-f hls'
            ])
            .output(outputFilePath)
            .on('start', commandLine => {
                console.log('Spawned ffmpeg with command:', commandLine);
            })
            .on('end', () => {
                console.log(`Processing ${resolution.name} finished successfully.`);
                resolve(outputFilePath);
            })
            .on('error', err => {
                console.error(`Error processing ${resolution.name}:`, err.message);
                reject(err);
            })
            .run();
    });
}

function generateIndexPlaylist(outputDir) {
    const playlistContent = resolutions.map(resolution =>
        `#EXT-X-STREAM-INF:BANDWIDTH=${parseInt(resolution.bitrate) * 1000},RESOLUTION=${resolution.width}x${resolution.height}\n${resolution.name}.m3u8`
    ).join('\n');
    const indexPlaylist = `#EXTM3U\n#EXT-X-VERSION:3\n${playlistContent}`;
    const indexPath = path.join(outputDir, 'index.m3u8');
    fs.writeFileSync(indexPath, indexPlaylist);
    return indexPath;
}

async function hlsConvert(config) {
    const tempDir = fs.mkdtempSync(path.join(process.cwd(), 'ffmpeg-'));

    try {
        const inputFilePath = path.join(tempDir, path.basename(config.key));
        
        const s3Object = await s3.getObject({ Bucket: config.bucketName, Key: config.key }).promise();
        fs.writeFileSync(inputFilePath, s3Object.Body);

        for (let resolution of resolutions) {
            await generateFFmpegCommand(resolution, inputFilePath, tempDir);
        }

        const indexPlaylist = generateIndexPlaylist(tempDir);
        const outputPrefix = `${config.destPrefixKey}`;

        const filesToUpload = [
            { path: indexPlaylist, key: `${outputPrefix}/index.m3u8`, contentType: 'application/vnd.apple.mpegurl' }
        ];

        for (let resolution of resolutions) {
            const resolutionFilePath = path.join(tempDir, `${resolution.name}.m3u8`);
            filesToUpload.push({ path: resolutionFilePath, key: `${outputPrefix}/${resolution.name}.m3u8`, contentType: 'application/vnd.apple.mpegurl' });
            const tsFiles = fs.readdirSync(tempDir).filter(file => file.startsWith(`${resolution.name}_`) && file.endsWith('.ts'));
            for (const tsFile of tsFiles) {
                const tsFilePath = path.join(tempDir, tsFile);
                filesToUpload.push({ path: tsFilePath, key: `${outputPrefix}/${tsFile}`, contentType: 'video/MP2T' });
            }
        }

        for (const file of filesToUpload) {
            await uploadToS3(config.bucketName, file.key, file.path, file.contentType);
        }

        console.log('All transformations executed and uploaded successfully.');
    } catch (error) {
        console.error('Error executing transformations:', error);
        throw error;
    } finally {
        fs.rmdirSync(tempDir, { recursive: true });
    }
}

module.exports = { hlsConvert };
