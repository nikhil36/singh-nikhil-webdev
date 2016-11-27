/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("Website", websiteSchema);
    
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById
    };
    return api;

    function createWebsiteForUser(uid, website) {
        console.log("In createWebsiteForUser model")
        console.log(website)
        website._user = uid;
        return websiteModel.create(website)
    }

    function updateWebsite(wid, website) {
        console.log("In updateWebsite model")
        delete website._id;
        return websiteModel
            .update({_id: wid},
                {
                    $set: website
                }
            );
    }

    function deleteWebsite(wid) {
        console.log("In deleteWebsite model")
        return websiteModel.remove({_id: wid});
    }

    function findAllWebsitesForUser(uid) {
        console.log("In findAllWebsitesForUser model")
        return websiteModel.find({"_user": uid});
    }

    function findWebsiteById(wid) {
        console.log("In findWebsiteById model")
        return websiteModel.findById(wid);
    }
}
