const mongoose = require('mongoose')
const planSchema = require('../Schemas/planSchema');

const planModel = mongoose.model('planModel', planSchema);

module.exports = planModel;