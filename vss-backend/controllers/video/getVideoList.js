const Video = require('../../models/videoModel');

const getVideoList = (req, res) => {
    Video.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving videos"
            });
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports = getVideoList;