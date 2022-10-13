const mongoose = require('mongoose')
const userSchema = require('../Schemas/userSchema');

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;