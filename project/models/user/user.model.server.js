/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var userSchema = require("./user.schema.server")();

    var userModel = mongoose.model("ProjectUser", userSchema);

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId:findUserByGoogleId,
        getAll : getAll,
        makeAdmin : makeAdmin,
        findSourcesForUser : findSourcesForUser,
        addSourceToUser:addSourceToUser,
        searchUsers:searchUsers,
    };

    return api;

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }
    function getAll() {
        return userModel.find();
    }

    function findUserByGoogleId(googleId) {
        console.log("In  project findUserByGoogleId model")
        return userModel.findOne({'google.id': googleId});
    }

    function createUser(user) {
        console.log(user)
        return userModel.create(user);
    }

    function makeAdmin(uid) {
        console.log(uid)
        return userModel
            .update({_id: uid}, {
                $set: {role:"ADMIN"}
            });
    }
    function updateUser(uid, user) {
        console.log("In  project updateUser model")
        delete user._id;
        return userModel
            .update({_id: uid}, {
                $set: user
            });
    }

    function deleteUser(uid) {
        console.log("In project deleteUser model")
        return userModel.remove({_id: uid});
    }

    function findUserByUsername(username) {
        console.log("In project findUserByUsername model")
        return userModel.findOne({username: username});
    }

    function findUserById(uid) {
        console.log("In project findUserById model: " + uid)
        return userModel.findById(uid);
    }

    function findUserByCredentials(username, password) {
        console.log("In project findUserByCredentials model")
        return userModel.findOne({username: username, password: password});
    }

    function findSourcesForUser(uid) {
        console.log("In project findSourcesForUser model:"+uid)
        return userModel.findById(uid);
    }

    function addSourceToUser(uid, source) {
        console.log("In  project updateUser model")

        // return userModel
        //     .update({_id: uid}, {
        //         $set: {sources:source}
        //     });

        userModel.findById(uid).then(
            function (user) {
                user.sources.push(source);
                return user.save()
            },function(error){console.log(error)}
        );

    }

    function searchUsers(searchString) {
        return userModel.find({"firstName": {$regex : ".*"+searchString+".*"}});
    }
}
