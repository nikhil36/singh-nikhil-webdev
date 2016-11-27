/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose =  require("mongoose");

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "Widget"}],
        name: {type: String, required: true},
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.page"});

    return pageSchema;
};