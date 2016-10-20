/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "wid": "456"},
            {"_id": "432", "name": "Post 2", "wid": "789"},
            {"_id": "543", "name": "Post 3", "wid": "456"}
        ];

        var api = {
            createPage :            createPage,
            findPageByWebsiteId :   findPageByWebsiteId,
            findPageById :          findPageById,
            updatePage :            updatePage,
            deletePage :            deletePage,
        };
        return api;

        function createPage(page) {
            pages.push(page)
            return page;

        }

        function findPageByWebsiteId(wid) {
            // console.log("In findPageByWebsiteId : ",wid);
            var userPages=[];
            for(p in pages)
            {
                if(pages[p].wid === wid)
                    userPages.push(pages[p])
            }
            return userPages
        }

        function findPageById(pageId) {
            // console.log("In findPageById : ",pageId);
            for(p in pages)
            {
                if(pages[p]._id === pageId)
                    return pages[p];
            }
        }

        function updatePage(pageId, page) {

            for (var p in pages) {
                var currentPage = pages[p];
                if (currentPage._id === pageId) {
                    pages[p] = page;
                }
            }
        }

        function deletePage(pageId) {
            var tempPages = [];
            for (var p in pages) {
                var page = pages[p];
                if (page._id !== pageId) {
                    tempPages.push(pages[p])
                }
            }
            pages = tempPages;

        }
    }
})();