const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ComplaintsSchema = new Schema({  
  user:{
    type: mongoose.ObjectId,
    required:true,
	ref:'user',
    index:true
  },
  status:{
    type:Boolean,
    index:true,
    default:false
  },
  view_status:{
    type:Boolean,
    index:true,
    default:false
  },
  category:{
    type:String,
    required:true,
    index:true
  },
  period:{
    type:Number,
    required:true,
    index:true
  },
  whatsapp:{
    type:Number,
    index:true
  },
  content:{
    type:String,
    required:true,
    index:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reply:{
    type:String,
    index:true
  }
  
});

module.exports = Complaints = mongoose.model("complaint", ComplaintsSchema);
