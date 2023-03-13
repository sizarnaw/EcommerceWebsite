const mongoose = require('mongoose');
const { UserModel } = require('../models');

class UserRepository {

    async CreateUser(UserData) {
        const { username, password, permission  } = UserData;
        const existingUser = await UserModel.findOne({username:username})
        if(!existingUser){
        const newestUser = await UserModel.find().sort({ "createdAt": -1 }).limit(1)
        const id = newestUser.length > 0 ? parseInt(newestUser[0].id) + 1 : "1";
        const newUser = { id, username, password, permission }
        const user = new UserModel(newUser);
        const userResult = await user.save();
        return {"status":200 , "message": userResult}
            
        } else { 
            return {"status":400 , "message": "Username Already in Use"}
            
        }

    }


    async FindUser(UserData) {
        const existingUser = await UserModel.findOne(UserData);
        return existingUser;
    }

    async FindUserrById(id) {

        const existingUser = await UserModel.find({ id: id });

        return existingUser;
    }
    async FindUserrByUUId(id) {

        const existingUser = await UserModel.findById(id);

        return existingUser;
    }

    async updatePermission(changePermessionInputs) {
        let { username, permission } = changePermessionInputs;
        const existingUser = await UserModel.findOne({ username: username });
        if (existingUser != null) {
            const updated=await UserModel.findOneAndUpdate({ username: username }, { permission: permission });
            return {"status":200 , "message": updated}
            
        }
        return {"status":400 , "message": "Username Doesnt exist"}
    }



}

module.exports = UserRepository;