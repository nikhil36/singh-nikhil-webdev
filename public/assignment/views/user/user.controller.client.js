/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)


    function LoginController($location, UserService) {
        console.log("In LoginController");
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user === null) {
                        vm.error = "Unable to login!";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function () {

                })
        }
    }

    function RegisterController($location, UserService) {
        console.log("In RegisterController");
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username === undefined || password === undefined || verifyPassword === undefined)
                vm.error = "Please enter all details!"
            else if (password === verifyPassword) {
                user = {
                   // _id: '' + Math.round(getRandomArbitrary(800, 900)),
                    username: username,
                    password: password, firstName: username, lastName: username, email: username + "@abc.com"
                }

                var promise = UserService.createUser(user);
                promise
                    .success(function (user) {
                        if (user === null) {
                            vm.error = "Unable to create user now!";
                        } else {
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function () {

                    })
            }
            else {
                vm.error = "Passwords are not matching!";
            }

        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        console.log("In ProfileController")

        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function (user) {
                     if (user != null) {
                        vm.user = user;
                    }

                })
                .error(function () {

                })
        }

        init();

        function updateUser() {
            UserService.updateUser(vm.user);

        }

        function unregisterUser() {
            UserService.deleteUser(vm.user._id)
                .success(function () {
                    $location.url('/login');
                })
                .error(function () {
                    
                });

        }
    }

})();
