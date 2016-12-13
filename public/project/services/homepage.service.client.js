/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("YourNews")
        .factory("HomePageService", HomePageService);

    function HomePageService($http) {

        var api = {
            getNewsSources : getNewsSources,
            addSource : addSource,
            getExistingNewsSources : getExistingNewsSources,
        };
        return api;


        function addSource(source) {
            return $http.post('/api/project/admin/addSource',source);
        }

        function getNewsSources() {
            // console.log( $http.get('https://newsapi.org/v1/sources?language=en'))
            return $http.get('https://newsapi.org/v1/sources?language=en');
        }

        function getExistingNewsSources() {
            // console.log( $http.get('https://newsapi.org/v1/sources?language=en'))
            return $http.get('/api/project/admin/sources');
        }


        function getNewsForCurrentUser(id) {
            return $http.get("/api/project/getNews/"+id);
        }

        function updatePage(pageId, page) {

            // for (var p in pages) {
            //     var currentPage = pages[p];
            //     if (currentPage._id === pageId) {
            //         pages[p] = page;
            //     }
            // }
            return $http.put('/api/page/'+pageId,page);
        }


        function deletePage(pageId) {
            // var tempPages = [];
            // for (var p in pages) {
            //     var page = pages[p];
            //     if (page._id !== pageId) {
            //         tempPages.push(pages[p])
            //     }
            // }
            // pages = tempPages;
            return $http.delete('/api/page/'+pageId);
        }
    }
})();