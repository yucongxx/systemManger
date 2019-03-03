const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    pName:String,
    subtitle:String,
    pBrand:String,
    pIntroduction:String,
    pId:String,
    pPrice:Number,
    pInventory:Number,
    pIntegral:Number,
    newPro:Boolean,
    pRemark:String,
    time:Number,
    recycle:Boolean,
    audit:Boolean,
    pPut: Boolean,
    checked:Boolean,
    auditTime:String
})