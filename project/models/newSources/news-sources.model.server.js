/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var newsSourceSchema = require("./news-sources.schema.server")();
    var newsSourceModel = mongoose.model("NewsSource", newsSourceSchema);

    var api = {
        createSource: createSource,
        updateSource: updateSource,
        deleteSource: deleteSource,
        findAllSources:findAllSources,
        deleteSource:deleteSource,
    };
    return api;
    
    function createSource(source)
    {
        console.log("In createSource model")

        return newsSourceModel.create(source);
    }

    function updateSource(name, source)
    {
        console.log("In updateSource model")
        delete page._id;
        return newsSourceModel
            .update(
                {name: name},
                {$set: source}
            );
    }

    function deleteSource(id)
    {
        console.log("In deleteSource model")
        return newsSourceModel.remove({_id: id});
    }

    function findAllSources()
    {
        console.log("In findAllSources model")
        return newsSourceModel.find();
    }



}