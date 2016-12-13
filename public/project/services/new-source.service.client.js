/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("YourNews")
        .factory("NewsSourceService", NewsSourceService);

    function NewsSourceService($http) {

        var api = {
            getNewsSources : getNewsSources,
            addSource : addSource,
            getExistingNewsSources : getExistingNewsSources,
            getNewsForCurrentUser:getNewsForCurrentUser,
            removeSource:removeSource,
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

        function getNewsForCurrentUser(uid,sname) {
            return $http.get('/api/project/user/'+uid+"/news/"+sname);
        }

        function removeSource(sid) {
            return $http.delete('/api/project/admin/removeSource/'+sid);
        }
    }
})();