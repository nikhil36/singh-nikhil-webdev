/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("YourNews")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            login: login,
            checkLogin:checkLogin,
            checkAdmin:checkAdmin,
            logout:logout,
            register: register,
            findCurrentUser:findCurrentUser,
            findAllUsers:findAllUsers,
            makeAdmin : makeAdmin,
            findSourcesForUsers:findSourcesForUsers,
            addSource:addSource,
            deleteSource:deleteSource,
            addLink:addLink,
            getLinksForUser:getLinksForUser,
            search:search,
        };
        return api;

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function makeAdmin(user) {
            return $http.post("/api/project/admin/makeAdmin", user);
        }

        function logout() {
            return  $http.post("/api/project/logout");
        }
        function checkLogin() {
            return  $http.post("/api/project/checkLogin");
        }
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            // var url = '/api/user?username=' + username + "&password=" + password;
            // return $http.get(url);

          return  $http.post("/api/project/login",user);
        }
        function createUser(user) {
            return $http.post('/api/project/user', user);

        }

        function findCurrentUser() {
            console.log("In findCurrentUser")
            var url = '/api/project/user';
            return $http.get(url);
        }

        function findUserById(id) {
            var url = '/api/project/user/' + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {
            var url = '/api/project/user?username=' + username + "&password=" + password;
            return $http.get(url);

        }

        function updateUser(user) {
            var url = '/api/project/user/'+user._id
            $http.put(url,user);

        }

        function deleteUser(userId) {
            var url = '/api/project/user/'+userId
            return $http.delete(url);
        }
        function checkAdmin() {
            return $http.post("/api/project/checkAdmin");
        }

        function findAllUsers() {
            return $http.get('/api/project/users');
        }
        function findSourcesForUsers(uid){
            var url = "/api/user/" + uid + "/sources";
            return $http.get(url);
        }

        function addSource(uid,source) {
            return $http.post("/api/user/"+uid+"/addSource/",source);
        }

        function deleteSource(uid,sid) {
            return $http.get("/api/user/"+uid+"/deleteSource/"+sid);
        }
        function addLink(uid,link) {
            return $http.post("/api/user/"+uid+"/link/",link);
        }
        function getLinksForUser(uid) {
            return $http.get("/api/user/"+uid+"/links/");
        }
        function search(searchString) {
            return $http.get("/api/user/search/"+searchString);
        }
    }
})();