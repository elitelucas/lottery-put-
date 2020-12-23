const User = require("../models/User");
const reward=require("../models/Reward");
const Reward = require("../models/Reward");

exports.listReward=(req,res,next)=>{
    const page=req.params.page;
    Reward.find({}).sort({_id: -1})
    .skip((page-1)*10)
    .limit(10)
    .then(rewards => {
        Reward.find({}).count().then(rewards_count=>{
  
          return res.status(200).json({rewards:rewards,
            page:page,
            last_page:Math.ceil(rewards_count/10)
          });
  
  
      });
    });
};
exports.createReward=(req,res,next)=>{
    if(req.body.money!="" && req.body.userphone!=""){
        const comp={};
        comp.money=req.body.money;
        comp.userphone=req.body.userphone;
        var reward=new Reward(comp).save((err,data)=>{
            
            res.status(200).json({message:'ok'});
        });
    }else
        res.status(200).json({message:'ok'});
    
};
exports.putReward=async (req,res,next)=>{
    try{
        var reward=await Reward.findById(req.params.id);
        if(reward && !reward.status)
        {
            reward.status=true;
            const saved=await reward.save();
            var user=await User.findOne({phone:reward.userphone});
            user.budget=parseFloat(user.budget)+parseFloat(reward.money);
            const saved_user=await user.save();
            return res.redirect('/');
        }
        res.status(400).json({error:'already rewarded'});
    }catch(err){
        res.status(400).json({error:'error'});
    }
    
};
exports.deleteReward=async (req,res,next)=>{
    try{
        var reward=await Reward.findById(req.params.id);
        if(reward && !reward.status)
        {
            const del=await reward.delete();
            return res.status(200).json({message:'ok'});
        }
        res.status(400).json({error:'fail'});
    }catch(err){
        res.status(400).json({error:'fail'});
    }
    
};