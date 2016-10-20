/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:'alice@a.com'},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:'bob@a.com'},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email:'charly@a.com'},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email:'jose@a.com'}
        ];
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
            users.push(user);
            return user;
        }

        function findUserById(id) {
            var _id = id.toString()
            for (var u in users) {
                var user = users[u];
                if (user._id === _id) {
                      return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {
            console.log("in function findUserByCredentials")
            var found = false;
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                     found = true;
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
        }

        function deleteUser(userId) {
        }
    }
})();