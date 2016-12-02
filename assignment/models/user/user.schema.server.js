/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose =  require("mongoose");

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        facebook: {
            token: String,
            id: String
        },
        google: {
            id: String,
            token: String
        },
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});
    return userSchema;
};