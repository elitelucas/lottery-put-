const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WithdrawlSchema = new Schema({  
  user:{
    type: mongoose.ObjectId,
    required:true,
    index:true
  },
  order_amount:{
    type:Number,
    index:true
  },

  bank_code:{
    type:String,
    index:true
  },
  province:{
    type:String,
    index:true
  },
  acc_no:{
    type:String,
    index:true
  },
  acc_name:{
    type:String,
    index:true
  },
  summary:{
    type:String,
    index:true
  },
  sign:{
    type:String,
    index:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type:Number,
    default:0,
    index:true
  }
  
});

module.exports = Withdrawl = mongoose.model("withdrawl", WithdrawlSchema);
