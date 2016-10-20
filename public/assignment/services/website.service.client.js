/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456"},
            {"_id": "234", "name": "Tweeter", "developerId": "456"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
            {"_id": "678", "name": "Checkers", "developerId": "123"},
            {"_id": "789", "name": "Chess", "developerId": "234"}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };
        return api;


        function createWebsite(userId, website) {
            websites.push(website)
            return website
        }

        function findWebsitesByUser(userId) {
            console.log("In findWebsitesByUser")
            var sites = [];
            for (var w in websites) {
                var website = websites[w];
                if (website.developerId === userId) {
                    sites.push(website);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            console.log("In findWebsiteById : ", websiteId)
            for (var w in websites) {
                var website = websites[w];
                if (website._id === websiteId) {
                    return JSON.parse(JSON.stringify(website))
                }
            }

        }

        function updateWebsite(websiteId, website) {
            console.log("In updateWebsite : ", websiteId)
            for (var w in websites) {
                var site = websites[w];
                if (site._id === websiteId) {
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(websiteId) {
            var sites = [];
            for (var w in websites) {
                var website = websites[w];
                if (website._id !== websiteId) {
                    sites.push(websites[w])
                }
            }
            websites = sites;
        }
    }

} )();