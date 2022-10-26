const { protectRoute } = require("../Controllers/authController");
const express = require('express');
const createSession = require("../Controllers/bookingController");
const bookingRouter = express.Router();

bookingRouter.post('/createSession', protectRoute, createSession);

module.exports = bookingRouter;