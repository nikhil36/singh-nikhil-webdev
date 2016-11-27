/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("Page", pageSchema);
    var api = {
        createPage: createPage,
        updatePage: updatePage,
        deletePage: deletePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById
    };
    return api;
    
    function createPage(wid, page)
    {
        console.log("In createPage model")
        page._website = wid;
        return pageModel.create(page);
    }

    function updatePage(pid, page)
    {
        console.log("In updatePage model")
        delete page._id;
        return pageModel
            .update(
                {_id: pid},
                {$set: page}
            );
    }

    function deletePage(pid)
    {
        console.log("In deletePage model")
        return pageModel.remove({_id: pid});
    }

    function findAllPagesForWebsite(wid)
    {
        console.log("In findAllPagesForWebsite model")
        return pageModel.find({_website: wid});
    }

    function findPageById(pid)
    {
        console.log("In findPageById model")
        return pageModel.findById(pid);
    }
}