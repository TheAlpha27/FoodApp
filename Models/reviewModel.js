const mongoose = require('mongoose')
const reviewSchema = require('../Schemas/reviewSchema');

const reviewModel = mongoose.model('reviewModel', reviewSchema);

module.exports = reviewModel;