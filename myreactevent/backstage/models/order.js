const mongoose = require('mongoose');
const usersSchema = require('../schemas/order');

module.exports = mongoose.model('Order', usersSchema);