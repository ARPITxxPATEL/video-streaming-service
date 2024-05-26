const Owner = require('../../models/ownerModel');

const getVideoList = (req, res) => {
    Owner.getProcessedVideos((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving processed videos"
            });
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports = getVideoList;