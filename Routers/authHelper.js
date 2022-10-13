const protectRoute = (req, res, next) => {
    // console.log(req.cookies.isLoggedIn);
    if (req.cookies.isLoggedIn) {
        next();
    }
    else {
        return res.json("Operation not allowed, please login");
    }
}

module.exports = protectRoute;