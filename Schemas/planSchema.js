const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price not entered'] //msg is shown when price is not entered
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: function(){
            return this.discount< 100;
        }
    }
});

module.exports = planSchema;