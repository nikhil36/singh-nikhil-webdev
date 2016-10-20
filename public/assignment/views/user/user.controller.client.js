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
            user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "Unable to login!";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        console.log("In RegisterController");
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
             if(username === undefined || password === undefined || verifyPassword === undefined)
                vm.error = "Please enter all details!"
            else if (password === verifyPassword) {
                user = {_id: ''+Math.round(getRandomArbitrary(800,900)),
                    username: username,
                    password: password, firstName: username, lastName: username,email:username+"@abc.com"}

                user = UserService.createUser(user);
                if (user === null) {
                    vm.error = "Unable to create user now!";
                } else {
                          $location.url("/user/" + user._id);
                }
            }
            else
            {
                vm.error = "Passwords are not matching!";
            }

        }
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }

    function ProfileController($routeParams, UserService) {
        console.log("In ProfileController")

        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }

})();
