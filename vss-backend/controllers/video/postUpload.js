const Video = require('../../models/videoModel'); 

const postUpload = (req, res) => {
    const { video_id, title } = req.body;

    const newVideo = new Video({
        video_id,
        title,
        description: req.body?.description,
        status: "pending"
    });

    Video.create(newVideo, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Video."
            });
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports = postUpload;
