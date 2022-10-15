const jwt = require('jsonwebtoken');
const JWT_KEY = 'fdfewfdscdsf'; //Secret key for jwt

const protectRoute = (req, res, next) => {
    // console.log(req.cookies.isLoggedIn);
    if (req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
        if (isVerified) {
            next();
        }
        else{
            return res.json('Invalid User');
        }
    }
    else {
        return res.json("Operation not allowed, please login");
    }
}

module.exports = protectRoute;