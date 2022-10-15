const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'fdfewfdscdsf'; //Secret key for jwt

const getSignUp = (req, res) => {
    res.sendFile('../index.html', { root: __dirname });
};

const postSignUp = async (req, res) => {
    let dataObj = req.body;
    let data = await userModel.create(dataObj);
    res.send({
        "msg": "data recieved",
        "data": data
    })
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
                    let token = jwt.sign({payload: payload}, JWT_KEY); //Creates signature
                    res.cookie('login', token, {httpOnly: true}); //Saves the jwt in cookies

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

module.exports = {
    getSignUp,
    postSignUp,
    loginUser
}