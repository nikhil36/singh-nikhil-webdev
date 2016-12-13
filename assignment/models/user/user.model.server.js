/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var userSchema = require("./user.schema.server")();

    var userModel = mongoose.model("User", userSchema);

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId:findUserByGoogleId,
    };

    return api;

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});
    }

    function createUser(user) {
        console.log(user)
        return userModel.create(user);
    }


    function updateUser(uid, user) {
        console.log("In updateUser model")
        delete user._id;
        return userModel
            .update({_id: uid}, {
                $set: user
            });
    }

    function deleteUser(uid) {
        console.log("In deleteUser model")
        return userModel.remove({_id: uid});
    }

    function findUserByUsername(username) {
        console.log("In findUserByUsername model")
        return userModel.findOne({username: username});
    }

    function findUserById(uid) {
        console.log("In findUserById model: " + uid)
        return userModel.findById(uid);
    }

    function findUserByCredentials(username, password) {
        console.log("In findUserByCredentials model")
        return userModel.findOne({username: username, password: password});
    }

}