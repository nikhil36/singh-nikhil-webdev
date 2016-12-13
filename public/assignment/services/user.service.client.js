/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
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


        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return  $http.post("/api/logout");
        }
        function checkLogin() {
            return  $http.post("/api/checkLogin");
        }
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            // var url = '/api/user?username=' + username + "&password=" + password;
            // return $http.get(url);

          return  $http.post("/api/login",user);
        }
        function createUser(user) {
            return $http.post('/api/user', user);

        }

        function findCurrentUser() {
            console.log("In findCurrentUser")
            var url = '/api/user';
            return $http.get(url);
        }

        function findUserById(id) {
            var url = '/api/user/' + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + "&password=" + password;
            return $http.get(url);

        }

        function updateUser(user) {
            var url = '/api/user/'+user._id
            $http.put(url,user);

        }

        function deleteUser(userId) {
            var url = '/api/user/'+userId
            return $http.delete(url);
        }
        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }


    }
})();