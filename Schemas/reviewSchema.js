const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, 'review is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel', //creating reference of user doing the review
        required: [true, 'Review must belong to a user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel', //creating reference of plan for the review is made
        required: [true, 'Review must belong to a plan']
    }
});

//Runs whenever any function like find, findbyid or any func beginning with find is invoked
reviewSchema.pre(/^find/, function (next) {
    this.populate({ //populates the specific fields in review schema
        path: "user", //user path/field is specified here
        select: "name profileImage" //user's name and profileImage is populated in the review schema
    }).populate("plan"); // whole plan schema is populated in reviewSchema
    next();
});

module.exports = reviewSchema;