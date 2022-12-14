const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY; //Secret key for jwt
const sendMail = require('../utils/nodemailer');

const getSignUp = (req, res) => {
    res.sendFile('../index.html', { root: __dirname });
};

const postSignUp = async (req, res) => {
    let dataObj = req.body;
    let data = await userModel.create(dataObj);
    if (data) {
        sendMail("signup", data);
        res.send({
            msg: "data recieved",
            data: data
        })
    }
    else {
        res.send({
            msg: 'User not signed up'
        })
    }

};

const loginUser = async (req, res) => {
    try {
        let data = req.body;
        let user = await userModel.findOne({ email: data.email });
        if (data.email) {
            if (user) {
                //bcrypt->compare | we will implement this later
                if (user.password == data.password) {
                    //Implementing cookies
                    // res.cookie('isLoggedIn', true, {httpOnly: true});

                    //Implementing JWT
                    let payload = user['_id']; //gets user's id as payload for jwt
                    let token = jwt.sign({ payload: payload }, JWT_KEY); //Creates signature
                    res.cookie('login', token, { httpOnly: true }); //Saves the jwt in cookies

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

const isAuthorised = (roles) => {
    return function (req, res, next) {
        // console.log(req.id, req.role);
        if (roles.includes(req.role) == true) { //Checks if the req object contains the role which is authorized and included in the roles array in the parameter function
            next();
        }
        else {
            res.status(401).json({
                msg: "Operation not allowed"
            })
        }
    }
}

const protectRoute = async (req, res, next) => {
    // console.log(req.cookies.isLoggedIn);
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        let payload = jwt.verify(req.cookies.login, JWT_KEY);
        if (payload) {
            // console.log("Payload: ", payload);
            const user = await userModel.findById(payload.payload);
            // console.log("User: ", user);
            req.role = user.role;
            req.id = user._id;
            next();
        }
        else {
            const client = req.get('User-Agent'); //fetches info if req is made from browser or postman type apps
            if (client.includes('Mozilla') == true) {//req is from browser
                return res.redirect('/login');
            }
            else {
                return res.json({ //req is from external softwares
                    msg: "User not verified"
                })
            }
        }
    }
    else {
        return res.json("Operation not allowed, please login");
    }
}

const forgetPassword = async (req, res) => {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        const resetToken = user.createResetToken(); //Custom method to create resetToken
        let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
        //send mail to user using nodemailer
        let obj = {
            resetPasswordLink: resetPasswordLink,
            email: email
        }
        sendMail('resetPassword', obj);
    } catch (error) {
        res.json({
            msg: error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        user.resetPasswordHandler(password, confirmPassword); //Custom method to reset the password
        await user.save();
        res.json({
            msg: "Password changed successfully"
        })
    } catch (error) {
        res.json({
            msg: error
        })
    }
}

const logout = (req, res) => {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        msg: "User logged out successfully"
    });
}

module.exports = {
    getSignUp,
    postSignUp,
    loginUser,
    isAuthorised,
    protectRoute,
    forgetPassword,
    resetPassword,
    logout
}