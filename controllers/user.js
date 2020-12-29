const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var unirest = require("unirest");
var request = unirest("POST", "https://www.fast2sms.com/dev/bulk");
const jwtDecode = require('jwt-decode');
const { body, validationResult } = require('express-validator');
setInterval(async () => {
  const users = await User.find({ phone_verified: false });
  for (let i = 0; i < users.length; i++) {
    let now = (new Date()).getTime();
    if (!users[i].updatedAt || now - users[i].updatedAt > 310000) {
      const referrer1 = await User.findById(users[i].refer1);
      if (referrer1) {
        const tmp = referrer1.refered1;
        tmp.splice(tmp.findIndex(ele => ele == users[i].id), 1);
        referrer1.refered1 = tmp;
        await referrer1.save();
      }
      const referrer2 = await User.findById(users[i].refer2);
      if (referrer2) {
        const tmp = referrer2.refered2;
        tmp.splice(tmp.findIndex(ele => ele == users[i].id), 1);
        referrer2.refered2 = tmp;
        await referrer2.save();
      }
      await users[i].remove();
    }

  }
}, 1800000);
(async () => {
  try {
    const users = await User.find({ phone_verified: false });
    for (let i = 0; i < users.length; i++) {
      let now = (new Date()).getTime();
      if (!users[i].updatedAt || now - users[i].updatedAt > 310000) {
        const referrer1 = await User.findById(users[i].refer1);
        if (referrer1) {
          const tmp = referrer1.refered1;
          tmp.splice(tmp.findIndex(ele => ele == users[i].id), 1);
          referrer1.refered1 = tmp;
          await referrer1.save();
        }
        const referrer2 = await User.findById(users[i].refer2);
        if (referrer2) {
          const tmp = referrer2.refered2;
          tmp.splice(tmp.findIndex(ele => ele == users[i].id), 1);
          referrer2.refered2 = tmp;
          await referrer2.save();
        }
        await users[i].remove();
      }

    }
  }
  catch (err) {
    console.log(err);
  }
})();
// (async ()=>{
//   console.log("start");
//   const Apply = require("../models/Apply");
//   const Bonus1 = require("../models/Bonus1");
//   const Bonus2 = require("../models/Bonus2");
//   const Complaints = require("../models/Complaints");
//   const MyEnjoy = require("../models/MyEnjoy");
//   const Recharge = require("../models/Recharge");
//   const Recharging = require("../models/Recharging");
//   const Reward = require("../models/Reward");
//   const Withdrawl = require("../models/Withdrawl");
//   let data=await Apply.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   console.log("apply");
//   data=await Bonus1.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].better);
//     const user1=await User.findById(data[i].receiver);
//     if(!user || !user1){
//       await data[i].remove();
//     }
//   }
//   data=await Bonus2.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].better);
//     const user1=await User.findById(data[i].receiver);
//     if(!user || !user1){
//       await data[i].remove();
//     }
//   }
//   data=await Complaints.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   data=await MyEnjoy.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   data=await Recharge.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   data=await Recharging.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   data=await Reward.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.find({phone:data[i].userphone});
//     if(user.length==0){
//       await data[i].remove();
//     }
//   }
//   data=await Withdrawl.find({});
//   for(let i=0;i<data.length;i++){
//     const user=await User.findById(data[i].user);
//     if(!user){
//       await data[i].remove();
//     }
//   }
//   console.log("end");

// })();
exports.user_register = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
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
          userFields.budget = 10;
          userFields.withdrawals = 60;
          userFields.email = '';
          userFields.recommendationCode = parseInt(Math.random() * 1000000);
          User.findById(req.body.recommendationCode, (err, referer) => {
            if (!err && referer) {
              userFields.refer1 = referer.id;
              if (referer.refer1)
                userFields.refer2 = referer.refer1;
            }

            const OTP = Math.floor(1000 + Math.random() * 9000);
            request.headers({
              "content-type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache",
              authorization: "KQ108AmW3benCoU1OJyEZng141dWGq1r63bMps71P541PH9J97jiopv2bwAW"
            });
            ////////////////////////////////////////////////////////////////
            request.form({
              "sender_id": "FSTSMS",
              "language": "english",
              "route": "qt",
              "numbers": req.body.phone,
              "message": "41140",
              "variables": "{#AA#}",
              "variables_values": OTP
            });

            request.end(function (res1) {
              if (res1.error) {
                // console.log(res1.raw_body);
                return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
              } else {
                userFields.otp = OTP;
                userFields.updatedAt = (new Date()).getTime();
                new User(userFields)
                  .save()
                  .then((user) => {
                    return res.status(200).json({ messgae: 'ok' });
                  })
                  .catch((err) => {
                    return res.status(400).json({ 'error': err });
                  });
                ///////////////////////////////////////////////////////////////////////////////      
              }
            });


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
    request.headers({
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      authorization: "KQ108AmW3benCoU1OJyEZng141dWGq1r63bMps71P541PH9J97jiopv2bwAW"
    });
    // ////////////////////////////////////////////////////////////////
    request.form({
      "sender_id": "FSTSMS",
      "language": "english",
      "route": "qt",
      "numbers": req.body.phone,
      "message": "41140",
      "variables": "{#AA#}",
      "variables_values": OTP
    });

    request.end(function (res1) {
      if (res1.error) {
        console.log(res1.raw_body);
        return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
      } else {
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
          request.headers({
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            authorization: "KQ108AmW3benCoU1OJyEZng141dWGq1r63bMps71P541PH9J97jiopv2bwAW"
          });
          // ////////////////////////////////////////////////////////////////
          request.form({
            "sender_id": "FSTSMS",
            "language": "english",
            "route": "qt",
            "numbers": req.body.phone,
            "message": "41140",
            "variables": "{#AA#}",
            "variables_values": OTP
          });

          request.end(function (res1) {
            if (res1.error) {
              // console.log(res1.raw_body);
              return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
            } else {
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
      request.headers({
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        authorization: "KQ108AmW3benCoU1OJyEZng141dWGq1r63bMps71P541PH9J97jiopv2bwAW"
      });
      // ////////////////////////////////////////////////////////////////
      request.form({
        "sender_id": "FSTSMS",
        "language": "english",
        "route": "qt",
        "numbers": req.body.phone,
        "message": "41140",
        "variables": "{#AA#}",
        "variables_values": OTP
      });

      request.end(function (res1) {
        if (res1.error) {
          // console.log(res1.raw_body);
          return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
        } else {
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

exports.user_verify = async (req, res, next) => {
  // console.log("verify works----");
  //find the user first
  const user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).json({ error: "something went wrong!" });
  //start verify
  var now = (new Date()).getTime();
  if (now - parseInt(user.updatedAt) > 300000) {
    return res.status(400).json({ error: "time out!" });
  }
  if (user.otp == req.body.otp) {
    const referer = await User.findById(user.refer1);
    if (referer) {
      var tmp = referer.refered1;
      if (!tmp.find(ele => ele == user.id)) {
        tmp = tmp.concat([user._id]);
        referer.refered1 = tmp;
        referer.save();
      }
      const referer2 = await User.findById(user.refer2);
      if (referer2) {
        tmp = referer2.refered2;
        if (!tmp.find(ele => ele == user.id)) {
          tmp = tmp.concat([user.id]);
          referer2.refered2 = tmp;
          referer2.save();
        }
      }
    }
    user.updatedAt = 0;
    user.otp = '';
    user.phone_verified = true;
    await user.save();
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
  } else {
    return res.status(400).json({ error: "otp failed!" });
  }
};
exports.user_login = (req, res, next) => {
  // console.log("login works, ->", req.body.phone);
  User.findOne({ phone: req.body.phone }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      // console.log(user.phone_verified);
      if (user.phone_verified == false) {
        const OTP = Math.floor(1000 + Math.random() * 9000);
        request.headers({
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          authorization: "KQ108AmW3benCoU1OJyEZng141dWGq1r63bMps71P541PH9J97jiopv2bwAW"
        });
        // ////////////////////////////////////////////////////////////////
        request.form({
          "sender_id": "FSTSMS",
          "language": "english",
          "route": "qt",
          "numbers": req.body.phone,
          "message": "41140",
          "variables": "{#AA#}",
          "variables_values": OTP
        });

        request.end(function (res1) {
          if (res1.error) {
            // console.log(res1.raw_body);
            return res.status(400).json({ error: JSON.parse(res1.raw_body).message });
          } else {
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
            // console.log(jwtDecode(token));
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

exports.getUsers = async (req, res, next) => {
  const search = req.params.search;
  const page = req.params.page;
  if (search) {
    const users = await User.find({ phone: search }).sort({ _id: -1 }).skip((page - 1) * 20).limit(20);
    const total = await User.countDocuments({ phone: search });
    return res.status(200).json({
      users: users,
      page: page,
      last_page: Math.ceil(total / 20)
    });
  } else {
    const users = await User.find({}).sort({ _id: -1 }).skip((page - 1) * 20).limit(20);
    const total = await User.countDocuments({});

    return res.status(200).json({
      users: users,
      page: page,
      last_page: Math.ceil(total / 20)
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id) 
    .populate('refer1')
    .populate('refer2')
    .populate('refered1')
    .populate('refered2');    
    const recharges = await Recharge.find({ user: req.params.id });
    const withdrawals = await Withdrawl.find({ user: req.params.id });
    const rewards = await Reward.find({ userphone: user.phone });
    const enjoys = await MyEnjoy.find({ user: req.params.id });
    return res.status(200).json({ user, recharges, withdrawals, rewards, enjoys });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "failed" });
  }

};
exports.putPointUp = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  .populate('refer1')
  .populate('refer2')
  .populate('refered1')
  .populate('refered2');
  if (user.admin) {
    user.superAdmin = true;
  } else {
    user.admin = true;
    user.superAdmin = false;
  }
  await user.save();
  
  return res.status(200).json(user);
};
exports.putPointDown = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  .populate('refer1')
  .populate('refer2')
  .populate('refered1')
  .populate('refered2');
  if (user.superAdmin) {
    user.superAdmin = false;
    user.admin = true;
  } else {
    user.admin = false;
    user.superAdmin = false;
  }
  await user.save();
  return res.status(200).json(user);
};
exports.removeUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  await user.remove();
  return res.status(200).json({ message: 'ok' });
};
exports.addUser = async (req, res, next) => {
  const count = await User.countDocuments({ phone: req.body.phone });
  if (count > 0)
    return res.status(400).json({ message: "Phone already exists" });
  let tmp = {};
  tmp.phone = req.body.phone;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  tmp.password = hash;
  if (req.body.role == "Super Admin") {
    tmp.admin = true;
    tmp.superAdmin = true;
  } else if (req.body.role == "Admin") {
    tmp.admin = true;
    tmp.superAdmin = false;
  }
  tmp.phone_verified = true;
  const user = await (new User(tmp)).save();
  try {
    const referrer1 = await User.findById(req.body.referral);
    if (referrer1) {
      user.refer1 = req.body.referral;
      if (referrer1.refer1)
        user.refer2 = referrer1.refer1;
      await user.save();
    }
    const user = await (new User(tmp)).save();
    if (referrer1) {
      tmp = referrer1.refered1;
      tmp = tmp.concat([user.id]);
      referrer1.refered1 = tmp;
      referrer1.save();
      if (user.refer2) {
        const referrer2 = await User.findById(user.refer2);
        tmp = referrer2.refered2;
        tmp = tmp.concat([user.id]);
        referrer2.refered2 = tmp;
        referrer2.save();
      }
    }
  } catch (err) {

  }

  return res.status(200).json(user);
};

exports.patchBalance = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  .populate('refer1')
  .populate('refer2')
  .populate('refered1')
  .populate('refered2');
  user.budget = req.body.balance;
  await user.save();
  return res.status(200).json(user);
};

exports.validateUser = [
  // body('g-recaptcha-response')
  //   .exists()
  //   .withMessage('Please select captcha')

  //   .notEmpty()
  //   .withMessage('Please select captcha'),
  body('password')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ min: 6 })
    .withMessage('must be at least 6 characters long')

    .isLength({ max: 50 })
    .withMessage('must be at most 50 characters long'),
  

  body('phone')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .matches(new RegExp(/^\d{10}$/))
    .withMessage('wrong number')


];