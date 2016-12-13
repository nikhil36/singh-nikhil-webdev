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
        role:{type: String, enum:['ADMIN','STUDENT','FACULTY'],default:'STUDENT'},
        type:{type:String,default:'PROJECT'},
        sources: [{type: mongoose.Schema.Types.ObjectId, ref: 'NewsSource'}],
        links: [],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});
    return userSchema;
};