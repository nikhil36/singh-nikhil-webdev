/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)


    function LoginController($location, UserService, $rootScope) {
        console.log("In LoginController");
        var vm = this;
        vm.login = login;

        function login(username, password) {
            //console.log([username, password])
                if (username == undefined || password == undefined) {
                    vm.error = "Please enter username and password";
                    //  $location.url("/login/");
                }
            else {
                var promise = UserService.login(username, password);
                promise
                    .success(function (response) {
                        if (response === null) {
                            vm.error = "Unable to login!";
                        } else {
                            console.log(response)
                            var user = response;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function () {
                        vm.error = "Unable to login!";
                    })
            }
        }

    }

    function RegisterController($location, UserService, $rootScope) {
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

                var promise = UserService.register(user);
                promise
                    .success(function (response) {
                        if (response === null) {
                            vm.error = "Unable to create user now!";
                        } else {
                            var user = response;
                            $rootScope.currentUser = user;
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
        //vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        function init() {
            var promise = UserService.findCurrentUser();
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

        function logout() {
            UserService.logout()
                .success(function () {
                    $location.url('/login');
                });

        }
    }

})();
