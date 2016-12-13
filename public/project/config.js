/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("YourNews")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "views/admin/admin-commands.view.client.html",
            })
            .when("/admin/listUsers", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model"

            })
            .when("/search", {
                templateUrl: "views/home/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"

            })
            .when("/admin/editNewsSource", {
                templateUrl: "views/admin/news-sources-edit.view.client.html",
                controller: "EditSourcesController",
                controllerAs: "model"

            })
            .when("/admin/addNewsSource", {
                templateUrl: "views/admin/news-sources-list.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"

            })
            .when("/user/:uid/addNewsSource", {
                templateUrl: "views/home/news-sources-list.view.client.html",
                controller: "UserAddSourcesController",
                controllerAs: "model"

            })

            .when("/source/:sid/", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "EditSourceController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }

            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/source/:sname", {
                templateUrl: "views/home/homepage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/links", {
                templateUrl: "views/home/user.links.view.client.html",
                controller: "LinksController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/sources", {
                templateUrl: "views/home/news-sources.view.client.html",
                controller: "UserSourcesController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .otherwise({
                redirectTo: "/login"
            });
        function checkLogin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .checkLogin()
                .then(
                    function (response) {
                        var user = response.data;
                 //       console.log(user);
                        if (user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/");
                    }
                );

            return deferred.promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(
                    function (user) {
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

    }
})();