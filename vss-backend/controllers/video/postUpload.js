const Video = require('../../models/videoModel'); 
const Owner = require('../../models/ownerModel');

const postUpload = (req, res) => {
    const { video_id, title, description, user_id } = req.body;

    const newVideo = new Video({
        video_id,
        title,
        description: description,
        status: "pending"
    });

    Video.create(newVideo, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Video."
            });
        }
    });

    const newOwner = new Owner({
        video_id,
        user_id
    });

    Owner.create(newOwner, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Owner relation."
            });
        } else {
            res.status(200).send(data);
        }
    })
};

module.exports = postUpload;
