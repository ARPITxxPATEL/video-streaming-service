const connection = require('./db');

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created user: ", {...newUser });
        result(null, {...newUser });
    });
};

User.findByEmail = (email, result) => {
    connection.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
  
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = User;