const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RewardSchema = new Schema({  
  userphone:{
    type: String,
    required:true,
    index:true
  },
  money:{
    type:Number,
	    required:true
  },
  createdBy:{
    type: mongoose.ObjectId,
    required:true,
    ref:'user',
    index:true
  },
  status:{
    type:Boolean,
    default:false
  }
  
});

module.exports = Reward = mongoose.model("reward", RewardSchema);
