const connection = require('./db');

const Owner = function(owner) {
    this.video_id = owner.video_id;
    this.user_id = owner.user_id;
};

Owner.create = (newOwner, result) => {
    connection.query("INSERT INTO owner SET ?", newOwner, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created owner relation: ", {...newOwner });
        result(null, {...newOwner });
    });
};

Owner.getProcessedVideos = (result) => {
    connection.query(
        "SELECT v.* FROM videos v JOIN owner o ON v.video_id = o.video_id WHERE v.status = 'processed'",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("processed videos: ", res);
            result(null, res);
        }
    );
};

Owner.getVideosByUserId = (user_id, result) => {
    connection.query(
        "SELECT v.* FROM videos v JOIN owner o ON v.video_id = o.video_id WHERE o.user_id = ?",
        [user_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length==0) {
                console.log("not found videos by user_id: ", user_id);
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("videos by user_id: ", res);
            result(null, res);
        }
    );
};

module.exports = Owner;
