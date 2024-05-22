const { getSignedCookies } = require('@aws-sdk/cloudfront-signer');

const getSignedCookie = (req, res) => {
    const video_id = req.params.video_id;
    const privateKey = process.env.PRIVATE_KEY; // your private key 
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID; // CloudFront key pair ID

    const policy = JSON.stringify({
        "Statement": [
            {
                "Resource": `https://${process.env.CLOUDFRONT_HOSTNAME}/processed/${video_id}/*`,
                "Condition": {
                    "DateLessThan": {
                        "AWS:EpochTime": Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000)
                    }
                }
            }
        ]
    });

    const signedCookie = getSignedCookies({
        keyPairId,
        privateKey,
        policy: policy,
    });

    res.cookie('CloudFront-Policy', signedCookie['CloudFront-Policy'], { httpOnly: true, secure: true });
    res.cookie('CloudFront-Signature', signedCookie['CloudFront-Signature'], { httpOnly: true, secure: true });
    res.cookie('CloudFront-Key-Pair-Id', signedCookie['CloudFront-Key-Pair-Id'], { httpOnly: true, secure: true });

    res.status(200).send({
        message: "Signed cookie generated successfully",
        videoUrl: `https://${process.env.CLOUDFRONT_HOSTNAME}/processed/${video_id}/index.m3u8`
    });
};

module.exports = getSignedCookie;
