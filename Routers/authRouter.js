const express = require('express');
const userModel = require('../Models/userModel');
const protectRoute = require('./authHelper');

//Auth Routes
const authRouter = express.Router();

const getSignUp = (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
};

const postSignUp = async (req, res) => {
    let dataObj = req.body;
    let data = await userModel.create(dataObj);
    res.send({
        "msg": "data recieved",
        "data": data
    })
};

authRouter
    .route('/signup')
    .get(getSignUp)
    .post(postSignUp);

const loginUser = async (req, res) => {
    try {
        let data = req.body;
        let user = await userModel.findOne({ email: data.email });
        if (data.email) {
            if (user) {
                //bcrypt->compare | we will implement this later
                if (user.password == data.password) {
                res.cookie('isLoggedIn', true, {httpOnly: true});
                    return res.json({
                        msg: "User has logged in succesfully",
                        userDetails: data
                    });
                }
                else {
                    return res.json({ msg: 'Wrong credentials' });
                }
            }
            else {
                return res.json({ msg: "User not found" });
            }
        }
        else {
            return res.json({ msg: "Emptry field found" });
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

authRouter
    .route('/login')
    .post(loginUser);

module.exports = authRouter;