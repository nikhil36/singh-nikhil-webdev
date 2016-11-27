/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose =  require("mongoose");

    var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        formatted: Boolean,
        size: Number,
        order: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.widget"});

    return widgetSchema;
};