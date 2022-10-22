const mongoose = require('mongoose');
const emailValidator = require('email-validator');
// const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.password == this.confirmPassword;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'owner', 'deliveryBoy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    },
    resetToken: String
});

//Hooks
//Pre- Before save event occurs in db
// userSchema.pre('save', function(){
//     console.log('Before saving the data', this); //we don't use arrow functions here as in arrow function we do not get the functionality of 'this' operator.
// });
//Post- After save event occurs in db
// userSchema.post('save', function(doc){
//     console.log('after saving the data', doc);
// });

//There is 'remove' paramerter too just like 'save', explore it.

userSchema.pre('save', function () {
    this.confirmPassword = undefined; // setting confirmPassword as undefined before saving into the db so that the db do not stores it in the db as it is a reduntant value to store.
})

//Hashing the password using bcrypt
// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })

module.exports = userSchema;