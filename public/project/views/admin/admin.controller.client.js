/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("YourNews")
        .controller("UserListController", UserListController)
        .controller("NewsSourcesController", NewsSourcesController)
        .controller("EditSourcesController", EditSourcesController)

    function UserListController($routeParams, UserService, $location) {
        console.log("In UserListController");
        var vm = this;

        function init() {
            UserService.findAllUsers()
                .success(function (users) {
                    vm.users = users;
                })
        }

        init();

    }


    function NewsSourcesController($routeParams, NewsSourceService, $location) {
        console.log("In NewsSourcesController");
        var vm = this;
        vm.addSource = addSource;

        function init() {
            sourceFromServer = []
            sourceFromDB = []

            NewsSourceService.getNewsSources()
                .success(function (response) {
                    sourceFromServer.push(response.sources);
                    NewsSourceService.getExistingNewsSources()
                        .success(function (response) {
                            sourceFromDB.push(response);
                            for (var i = 0; i < sourceFromDB[0].length; i++) {
                                for (var j = 0; j < sourceFromServer[0].length; j++) {
                                    //console.log(sourceFromDB[0][i].id,'-',sourceFromServer[0][j].id)
                                    if (sourceFromDB[0][i].id === sourceFromServer[0][j].id) {
                                        //     console.log("Matched")
                                        sourceFromServer[0].splice(j, 1);
                                    }
                                }
                            }
                            vm.sources = sourceFromServer[0];
                        })
                })
        }

        init();


        function addSource(source) {
            //     console.log(source)
            NewsSourceService.addSource(source)
                .success(function (source) {
                    if (source === null) {
                        vm.error = "Unable to add the source now, please try again later.";
                    } else {
                        vm.message = "Source successfully added";
                        init()

                    }
                })

        }
    }

    function EditSourcesController($routeParams, NewsSourceService) {
        //console.log("In EditSourcesController");
        var vm = this;
        vm.mode = "EDIT";
        vm.removeSource = removeSource;
        function init() {
            NewsSourceService.getExistingNewsSources()
                .success(function (response) {
                    vm.sources = response;
                })
        }

        init();

        function removeSource(source) {
            console.log(source)
            NewsSourceService.removeSource(source._id)
                .success(function (source) {
                    if (source === null) {
                        vm.error = "Unable to add the source now, please try again later.";
                    } else {
                        vm.message = "Source successfully removed";
                        init()

                    }
                })

        }

    }


})();
