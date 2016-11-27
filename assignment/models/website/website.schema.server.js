/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: {type: String, required: true},
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.website"});

    return websiteSchema;
}
