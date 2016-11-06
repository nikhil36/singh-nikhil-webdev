/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {"_id": "123", "name": "Facebook", "developerId": "456"},
        //     {"_id": "234", "name": "Tweeter", "developerId": "456"},
        //     {"_id": "456", "name": "Gizmodo", "developerId": "456"},
        //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
        //     {"_id": "678", "name": "Checkers", "developerId": "123"},
        //     {"_id": "789", "name": "Chess", "developerId": "234"}
        // ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
        };
        return api;


        function createWebsite(userId, website) {
            return $http.post('/api/user/'+userId+"/website",website);
        }

        function findWebsitesByUser(userId) {
            console.log("In findWebsitesByUser")
            // var sites = [];
            // for (var w in websites) {
            //     var website = websites[w];
            //     if (website.developerId === userId) {
            //         sites.push(website);
            //     }
            // }
            // return sites;
            return $http.get('/api/user/'+userId+'/website')

        }

        function findWebsiteById(websiteId) {
            console.log("In findWebsiteById : ", websiteId)
            // for (var w in websites) {
            //     var website = websites[w];
            //     if (website._id === websiteId) {
            //         return JSON.parse(JSON.stringify(website))
            //     }
            // }

            return $http.get('/api/website/'+websiteId);
        }

        function updateWebsite(websiteId, website) {
            console.log("In updateWebsite : ", websiteId)
            // for (var w in websites) {
            //     var site = websites[w];
            //     if (site._id === websiteId) {
            //         websites[w] = website;
            //     }
            // }
            return $http.put("/api/website/"+websiteId,website)
        }

        function deleteWebsite(websiteId) {
            var sites = [];
            // for (var w in websites) {
            //     var website = websites[w];
            //     if (website._id !== websiteId) {
            //         sites.push(websites[w])
            //     }
            // }
            // websites = sites;
            return $http.delete("/api/website/"+websiteId)
        }
    }

} )();