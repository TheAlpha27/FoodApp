const mongoose = require('mongoose')
const userSchema = require('../Schemas/userSchema');
const crytpo = require('crypto');

const userModel = mongoose.model('userModel', userSchema);

userSchema.methods.createResetToken = function(){
    // creating resetToken using crypto
    const resetToken = crypto.getRandomValues(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}

module.exports = userModel;