const { application } = require('express');
const express = require('express');
// const userModel = require('../Models/userModel');
const { getUser, getAllUsers, updateUser, deleteUser } = require('../Controllers/userController');
const { getSignUp, postSignUp, loginUser, isAuthorised, protectRoute } = require('../Controllers/authController');

//User Routes
const userRouter = express.Router();

//Login Signup
userRouter
    .route('/signup')
    .get(getSignUp)
    .post(postSignUp);

userRouter
    .route('/login')
    .post(loginUser);

//User Options
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

//Profile Page
userRouter.use(protectRoute);
userRouter
    .route('/userprofile')
    .get(getUser);

//Admin Specific functions
userRouter.use(isAuthorised(['admin']));
userRouter
    .route('/')
    .get(getAllUsers);




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