const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RechargingSchema = new Schema({  
  user:{
    type: mongoose.ObjectId,
    required:true,
    index:true
  },  
  accNo:{
    type:String,
    index:true
  },  
  bankCode:{
    type:String,
    index:true
  },  
  pname:{
    type:String,
    index:true
  },  
  phone:{
    type:String,
    index:true
  },  
  pemail:{
    type:String,
    index:true
  },  
  busi_code:{
    type:String,
    index:true
  },  
  order_amount:{
    type:Number,
    index:true
  },  
  order:{
    type:String,
    index:true
  },
  sign:{
    type:String
  },

  recharge_id:{
    type:String,
    index:true
  },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
  
});

module.exports = Recharging = mongoose.model("recharging", RechargingSchema);
