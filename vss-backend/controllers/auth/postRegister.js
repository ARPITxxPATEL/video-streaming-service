const User = require('../../models/userModel');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try{
    const { username, password, email } = req.body;

    // check if user exists
    let userExists = false;
    let user;
    
    const _ = await new Promise((resolve, reject) => {
      User.findByEmail(email.toLowerCase(), (err, userData) => {
        if (err) {
          if (err.kind == "not_found") {
            userExists = false;
          } else {
            return res.status(500).send({
              message: "Something went wrong. Please try again"
            });
          }
        } else{
          userExists = true;
          user = userData;
        }
        resolve();
      });
    });

    if(userExists){
      return res.status(409).send('E-mail already in use.');
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // add user object
    const userCreated = await new Promise((resolve, reject) => {
      User.create({email:email.toLowerCase(), username, password: encryptedPassword}, (err, userData) => {
        if (err) {
          return res.status(500).send({
            message: "Coudn't create user. Please try again"
          });
        }
        else user = userData;
        resolve();
      });
    });

    //create JWT token
    const token = jwt.sign(
      {
        email: email.toLowerCase()
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h'
      }
    );

    return res.status(201).send({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
        user_id: user.user_id
      }
    });

  } catch(err){
    return res.status(500).send("Error occured. Please try again");
  }
}  

module.exports = postRegister;