const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter');
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

//DB-Connection
const pass = 'gWSQGcq6JRw92kk';

mongoose.connect(`mongodb+srv://utsav1234:${pass}@cluster0.smirmus.mongodb.net/?retryWrites=true&w=majority`)
    .then((db) => {
        console.log('db connected');
    })
    .catch((err) => {
        console.log(err);
    });

