const connection = require('./db');

const Video = function(video) {
    this.video_id = video.video_id;
    this.title = video.title;
    this.description = video.description;
    this.status = video.status;
};

Video.create = (newVideo, result) => {
    connection.query("INSERT INTO videos SET ?", newVideo, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created video: ", {...newVideo });
        result(null, {...newVideo });
    });
};

Video.findById = (video_id, result) => {
    connection.query("SELECT * FROM videos WHERE video_id = ?", video_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found video: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        // not found Video with the id
        result({ kind: "not_found" }, null);
    });
};

Video.updateStatus = (video_id, status, result) => {
    connection.query(
        "UPDATE videos SET status = ? WHERE video_id = ?",
        [status, video_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            
            if (res.affectedRows == 0) {
                // not found Video with the id
                result({ kind: "not_found" }, null);
                return;
            }
            
            console.log("updated video: ", { video_id: video_id, status: status });
            result(null, { video_id: video_id, status: status });
        }
    );
};

Video.getAll = (result) => {
    connection.query("SELECT * FROM videos WHERE status = 'processed'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("videos: ", res);
        result(null, res);
    });
};

module.exports = Video;
