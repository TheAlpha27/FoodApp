const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');
// const authRouter = require('./Routers/authRouter');

app.listen(8080, () => {
    console.log("App listening on port 8080");
});

app.use(express.json());

//Cookies
app.use(cookieParser());

//Authentication ROutes
// app.use('/auth', authRouter);

//User Routes
app.use('/user', userRouter);

//Plan Routes
app.use('/plan', planRouter);

//Review Routes
app.use('/review', reviewRouter);

//Payment Routes
app.use('/payment', bookingRouter);

//DB-Connection
const pass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://utsav1234:${pass}@cluster0.smirmus.mongodb.net/?retryWrites=true&w=majority`)
    .then((db) => {
        console.log('db connected');
    })
    .catch((err) => {
        console.log(err);
    });

