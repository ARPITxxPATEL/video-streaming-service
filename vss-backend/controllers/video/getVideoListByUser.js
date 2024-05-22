const Owner = require('../../models/ownerModel');

const getVideoListByUser = (req, res) => {
    const user_id = req.params.user_id;

    Owner.getVideosByUserId(user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No videos found for user with id ${user_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving videos for user with id " + user_id
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

module.exports = getVideoListByUser;