const User=require('../models/User');
module.exports = (req, res, next) => {
  User.findById(req.userFromToken._id)
  .then((user)=>{
    if(user.superAdmin)
      next();
    else
      return res.status(401).json("Not a super admin");
  }).catch(err=>{
    return res.status(401).json("Not a super admin");
  })
};
