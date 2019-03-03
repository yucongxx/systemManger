const mongoose = require('mongoose');
const usersSchema = require('../schemas/product');

module.exports = mongoose.model('Prodcut', usersSchema);