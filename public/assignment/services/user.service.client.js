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
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };
        return api;

        function createUser(user) {
            return $http.post('/api/user', user);

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


    }
})();