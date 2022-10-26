const express = require('express');
// const userModel = require('../Models/userModel');
const { getUser, getAllUsers, updateUser, deleteUser, updateProfileImage } = require('../Controllers/userController');
const { getSignUp, postSignUp, loginUser, isAuthorised, protectRoute, forgetPassword, resetPassword, logout } = require('../Controllers/authController');
const multer = require('multer');
const path = require('path');

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

userRouter
    .route('/forgetpassword')
    .post(forgetPassword);

userRouter
    .route('/resetpassword/:token')
    .post(resetPassword);

userRouter
    .route('/logout')
    .post(logout);

//Multer Routes

//upload -> storage, filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, `user-${Date.now()}.jpeg`);
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }
    else {
        cb(new Error("Not an Image! Please upload an image file"), false)
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filter
});

userRouter.get('/profileimage', (req, res) => {
    res.sendFile('/home/thealpha27/code/backend/FoodApp/multer.html')
})

userRouter.post('/profileimage', upload.single("image"), updateProfileImage);

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