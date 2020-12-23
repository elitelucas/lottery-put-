const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var unirest = require("unirest");
const jwtDecode = require('jwt-decode');


exports.user_register = (req, res, next) => {

  User.findOne({ phone: req.body.phone }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      const error = "phone already exists!";
      // console.log(error);
      return res.status(400).json({ error });
    } else {
      // console.log("----", req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          const userFields = {};
          userFields.phone = req.body.phone;
          userFields.password = hash;
          userFields.budget = 0;
          userFields.email = '';
          userFields.recommendationCode = parseInt(Math.random() * 1000000);
          User.findById(req.body.recommendationCode, (err, referer) => {
            if (!err && referer) {
              userFields.refer1 = referer._id;
              if (referer.refer1)
                userFields.refer2 = referer.refer1;
            }

            const OTP = Math.floor(1000 + Math.random() * 9000);
            const req = unirest('POST', 'https://platform.releans.com/api/v2/message')
              .headers({
                'Authorization': 'Bearer be17e6fad6ffd77b2289fc49b5e905f5'
              })
              .send('sender=Luckyweb')
              .send('mobile=+91' + req.body.phone)
              .send('content=Your OTP is ' + OTP)
              .end(function (res1) {
                if (res1.error) {
                  console.log(res1.raw_body);
                  return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
                } else {
                  userFields.otp = OTP;
                  userFields.updatedAt = (new Date()).getTime();
                  new User(userFields)
                    .save()
                    .then((user) => {
                      if (referer) {
                        console.log(referer);
                        var tmp = referer.refered1;
                        tmp = tmp.concat([user._id]);
                        referer.refered1 = tmp;
                        referer.save();
                        User.findById(user.refer2, (err, referer2) => {
                          var tmp = referer2.refered2;
                          tmp = tmp.concat([user._id]);
                          referer2.refered2 = tmp;
                          referer2.save();
                        });
                      }

                      return res.status(200).json({ messgae: 'ok' });
                    })
                    .catch((err) => {
                      return res.status(400).json({ 'error': err });
                    });
                  ///////////////////////////////////////////////////////////////////////////////      
                }
              });
            // ////////////////////////////////////////////////////////////////


          })


        });
      });
    }
  });
};

exports.user_phone = (req, res, next) => {
  // console.log("phone works---- ", req.body);
  //save the number as not verified then send the OTP code

  User.findOne({ "phone": req.body.phone }, (err, user) => {
    // If no document is found, user is null
    if (!user) {
      // console.log("number not found ");
      //check if this number is beyond another account
      // if (user.email !== req.userFromToken.email)
      return res.status(400).json({ "error": "Phone not found!" });
    }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const req = unirest('POST', 'https://platform.releans.com/api/v2/message')
      .headers({
        'Authorization': 'Bearer be17e6fad6ffd77b2289fc49b5e905f5'
      })
      .send('sender=Luckyweb')
      .send('mobile=+91' + req.body.phone)
      .send('content=Your OTP is ' + OTP)
      .end(function (res1) {
        if (res1.error) return res.status(400).json({ error: "error on otp" });
        else {
          user.otp = OTP;
          user.updatedAt = (new Date()).getTime();
          user.save((err) => {
            return res.status(200).json({ messgae: 'ok' });
          });

        }
      });


  });
};

exports.user_phone_change = (req, res, next) => {
  //save the number as not verified then send the OTP code
  User.findById(req.userFromToken._id, (err, user) => {
    if (user.phone != req.body.phone) {
      // console.log(user.phone+ " "+req.body.phone)
      User.findOne({ "phone": req.body.phone }, (err, user1) => {
        // If no document is found, user is null
        if (!user1) {
          const OTP = Math.floor(1000 + Math.random() * 9000);
          const req = unirest('POST', 'https://platform.releans.com/api/v2/message')
            .headers({
              'Authorization': 'Bearer be17e6fad6ffd77b2289fc49b5e905f5'
            })
            .send('sender=Luckyweb')
            .send('mobile=+91' + req.body.phone)
            .send('content=Your OTP is ' + OTP)
            .end(function (res1) {
              if (res1.error) return res.status(400).json({ error: "error on otp" });
              else {
                user.phone = req.body.phone;
                user.otp = OTP;
                user.phone_verified = false;
                user.updatedAt = (new Date()).getTime();
                user.save((err) => {
                  return res.status(200).json({ messgae: 'ok' });
                });

              }
            });

        } else {
          // console.log("number already exists");
          //check if this number is beyond another account
          // if (user.email !== req.userFromToken.email)
          return res.status(400).json({ "error": "Phone is already exist!" });
        }

      });
    } else {
      const OTP = Math.floor(1000 + Math.random() * 9000);
      const req = unirest('POST', 'https://platform.releans.com/api/v2/message')
        .headers({
          'Authorization': 'Bearer be17e6fad6ffd77b2289fc49b5e905f5'
        })
        .send('sender=Luckyweb')
        .send('mobile=+91' + req.body.phone)
        .send('content=Your OTP is ' + OTP)
        .end(function (res1) {
          if (res1.error) return res.status(400).json({ error: "error on otp" });
          else {
            user.otp = OTP;
            user.phone_verified = false;
            user.updatedAt = (new Date()).getTime();
            user.save((err) => {
              return res.status(200).json({ messgae: 'ok' });
            });

          }
        });


    }


  });


};

exports.user_verify = (req, res, next) => {
  // console.log("verify works----");
  //find the user first

  User.findOne({ phone: req.body.phone }, (err, user) => {
    if (!user || err) return res.status(400).json({ error: "something went wrong!" });
    //start verify
    var now = (new Date()).getTime();
    if (now - parseInt(user.updatedAt) > 120000)
      return res.status(400).json({ error: "time out!" });
    if (user.otp == req.body.otp) {
      user.updatedAt = 0;
      user.otp = '';
      user.phone_verified = true;
      user.save((err) => {
        const token = jwt.sign(
          {
            phone: user.phone,
            _id: user._id

          },
          process.env.AUTH_SECRET,
          {
            expiresIn: "1h",
          }
        );
        userToken = "Bearer " + token;
        //no need to send hashed password to the frontend
        user.password = "";
        return res.status(200).json({ user, userToken });
      });
    } else {
      return res.status(400).json({ error: "otp failed!" });
    }
  });
};
exports.user_login = (req, res, next) => {
  // console.log("login works, ->", req.body.phone);
  User.findOne({ phone: req.body.phone }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      // console.log(user.phone_verified);
      if (user.phone_verified == false) {
        const OTP = Math.floor(1000 + Math.random() * 9000);
        const req = unirest('POST', 'https://platform.releans.com/api/v2/message')
          .headers({
            'Authorization': 'Bearer be17e6fad6ffd77b2289fc49b5e905f5'
          })
          .send('sender=Luckyweb')
          .send('mobile=+91' + req.body.phone)
          .send('content=Your OTP is ' + OTP)
          .end(function (res1) {
            if (res1.error) return res.status(400).json({ error: "error on otp" });
            else {
              user.otp = OTP;
              user.updatedAt = (new Date()).getTime();
              user.save((err) => {
                if (!err) {
                  return res.status(400).json({ phone: user.phone, error: '1' });
                } else {
                  return res.status(400).json({ 'error': err });
                }
              });


            }
          });


      } else {
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(
              {
                phone: user.phone,
                _id: user._id

              },
              process.env.AUTH_SECRET,
              {
                expiresIn: "1h",
              }
            );
            console.log(jwtDecode(token));
            userToken = "Bearer " + token;
            //no need to send hashed password to the frontend
            user.password = "";
            return res.status(200).json({ user, userToken });
          } else return res.status(401).json({ error: "Password incorrect!" });
        });
      }
      // if (user.emailVerified != true) {
      //   return res.status(401).json("Email is not verified!");
      // } else {

      // }
    } else return res.status(401).json({ error: "phone not found!" });
  });

};
exports.change_password = (req, res, next) => {
  User.findById(req.userFromToken._id, (err, user) => {
    if (user.phone != req.body.phone) {
      return res.status(400).json({ error: "something went wrong!" });
    }
    else {

      var now = (new Date()).getTime();
      if (now - parseInt(user.updatedAt) > 120000)
        return res.status(400).json({ error: "time out!" });
      if (user.otp == req.body.otp) {
        user.updatedAt = 0;
        user.otp = '';
        user.phone_verified = true;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save((err) => {
              if (err) return res.status(400).json({ error: "DB failed!" });
              const token = jwt.sign(
                {
                  phone: user.phone,
                  _id: user._id

                },
                process.env.AUTH_SECRET,
                {
                  expiresIn: "1h",
                }
              );
              userToken = "Bearer " + token;
              //no need to send hashed password to the frontend
              user.password = "";
              return res.status(200).json({ user, userToken });
            });
          });
        });
      } else {
        // console.log(user.otp+" "+req.body.otp);
        return res.status(400).json({ error: "otp failed!" });
      }
    }



  });
};
exports.postNickname = (req, res, next) => {
  User.findById(req.userFromToken._id, (err, user) => {
    user.nickname = req.body.nickname;
    user.save((err) => {
      res.status(200).json({ message: 'ok' });
    })



  });
};