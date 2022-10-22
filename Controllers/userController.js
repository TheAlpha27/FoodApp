const userModel = require('../Models/userModel');

// const createUser = async () => {
//     let user = {
//         name: "Utsav",
//         email: "utsav@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// }

//Get All Users
const getAllUsers = async (req, res) => {
    let allUsers = await userModel.find();
    res.json({
        msg: "List of all users",
        data: allUsers
    });
}

//Get User By ID
const getUser = async (req, res) => {
    let uid = req.id;
    // console.log(req.id);
    let data = await userModel.findById(uid);
    if (data) {
        return res.json({
            msg: "User found!",
            data: data
        });
    }
    else {
        return res.json({
            msg: "User not found"
        })
    }

}


//Update
// const updateUser = async (req, res) => {
//     let uid = req.params.id;
//     let dataToBeUpdated = req.body;
//     let user = await userModel.findOneAndUpdate({ _id: uid }, dataToBeUpdated);
//     res.json({
//         msg: "data updated",
//         data: data
//     });
// }
const updateUser = async (req, res) => {
    let uid = req.params.id;
    // console.log(uid);
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({ _id: uid }, dataToBeUpdated);
    // console.log(user);
    if(user){
        // const keys = [];
        // for(let key in dataToBeUpdated)
        // {
        //     keys.push(key);
        // }
        // for(let i = 0; i<keys.length; i++)
        // {
        //     user[keys[i]] = dataToBeUpdated[keys[i]];
        // }
        // const updatedData = await user.save();
        res.json({
            msg: "User updated",
            data: user
        })
    }
    else{
        res.json({
            msg: "User not found"
        })
    }
}

//Delete
const deleteUser = async (req, res) => {
    let uid = req.params.id;
    let data = await userModel.findByIdAndDelete(uid);
    res.json({
        msg: 'data deleted',
        data: data
    })
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};