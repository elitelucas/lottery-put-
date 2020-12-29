const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports =async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log("token received is: ", token);
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.userFromToken = decoded;
    const user=await User.findById(req.userFromToken._id);
    if(user.phone_verified)
      next();
    else
      return res.status(401).json("unauth");
  } catch (err) {
    //console.log("unauth------ ", err);
    return res.status(401).json("unauth");
  }
};
