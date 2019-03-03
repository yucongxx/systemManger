const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    oPrice: Number,
    oMount: Number,
    oNumber: String,
    time: Number,
    oAccount: String,
    checked: Boolean,
    oPayMethod:Number,
    oOrderStatus:Number
})