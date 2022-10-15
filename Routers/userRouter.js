const express = require('express');
// const userModel = require('../Models/userModel');
const protectRoute = require('../Controllers/authHelper');
const {createUser, getUsers, updateUser, deleteUser} = require('../Controllers/userController');
//User Routes
const userRouter = express.Router();



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