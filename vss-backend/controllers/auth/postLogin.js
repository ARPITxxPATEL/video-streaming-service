const User = require('../../models/userModel');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try{
    const { email, password } = req.body;

    let user;

    const _ = await new Promise((resolve, reject) => {
      User.findByEmail(email.toLowerCase(), (err, userData) => {
        if (err) {
          if (err.kind == "not_found") {
            return res.status(404).send({
              message: `Not found user with email ${email.toLowerCase()}.`
            });
          } else {
            return res.status(500).send({
              message: "Error retrieving User with email " + email.toLowerCase()
            });
          }
        } else user = userData;
        resolve();
      });
    });

    console.log(password, user.password, (await bcrypt.compare(password, user.password)));

    if(user && (await bcrypt.compare(password, user.password))) {
      // send new token
      const token = jwt.sign(
        {
          email: email.toLowerCase()
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h'
        }
      );

      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
        }
      })
    }

    return res.status(400).send('Invalid credentials. Please try again.');
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again');
  }
}  

module.exports = postLogin;