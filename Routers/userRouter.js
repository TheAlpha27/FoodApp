const express = require('express');
const userModel = require('../Models/userModel');
const protectRoute = require('./authHelper');

//User Routes
const userRouter = express.Router();

const createUser = async () => {
    let user = {
        name: "Utsav",
        email: "utsav@gmail.com",
        password: "12345678",
        confirmPassword: "12345678"
    };
    let data = await userModel.create(user);
    console.log(data);
}

//Find
const getUsers = async (req, res) => {
    let allUsers = await userModel.find();
    res.json({
        msg: "List of all users",
        data: allUsers
    });
}

//Update
const updateUser = async (req, res) => {
    let dataToBeUpdated = req.body;
    let data = await userModel.findOneAndUpdate({ email: '123@gmail.com' }, dataToBeUpdated);
    res.json({
        msg: "data updated",
        data: data
    });
}

//Delete
const deleteUser = async (req, res) => {
    let dataToBeDeleted = req.body;
    let data = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        msg: 'data deleted',
        data: data
    })
};

userRouter.route('/')
    .get(protectRoute, getUsers)
    .patch(updateUser)
    .delete(deleteUser);


//Cookies
// const setCookies = (req, res) => {
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true }); //third object parameter is optional | maxAge: time to expire cookies in ms, secure: set true to run cookies only on https, httpOnly: set true to make cookie accessible only through backend and not frontend
//     res.send('cookies have been sent');
// }

// const getCookies = (req, res) => {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send('cookies received');
// }

// userRouter.route('/setCookies')
//     .get(setCookies);
// userRouter.route('/getCookies')
//     .get(getCookies);

module.exports = userRouter;