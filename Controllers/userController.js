const userModel = require('../Models/userModel');

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

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};