/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose =  require("mongoose");

    var newSourceSchema = mongoose.Schema({
        category: String,
        country: String,
        description : String,
        id : String,
        name : String,
        language:String,
        url: String,
        title: String,
        description: String,
        urlsToLogos: [],
        dateAdded: {type: Date, default: Date.now()}
    }, {collection: "project.newssources"});

    return newSourceSchema;
};