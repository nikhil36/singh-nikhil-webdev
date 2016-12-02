/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)


    function WebsiteListController($routeParams, WebsiteService) {
        console.log("In WebsiteListController");
        var vm = this;

        vm.uid = $routeParams["uid"];
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function (websites) {
                    vm.websites = websites
                })
        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        console.log("In NewWebsiteController");
        var vm = this;
        vm.createWebsite = createWebsite;

        vm.uid = $routeParams["uid"];
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise
                .success(function (websites) {
                    vm.websites = websites
                })
        }

        init();

        function createWebsite(name, desc, uid) {
            // console.log("desc:"+desc)
            if (name == undefined || desc == undefined) {
                vm.error = "Please fill all the fields"
                return
            }
            var website = {
                //      _id: '' + Math.round(getRandomArbitrary(800, 900)),
                name: name, description: desc
            }

            var promise = WebsiteService.createWebsite(uid, website);
            promise.success(function (website) {
                if (website === null) {
                    vm.error = "Unable to create a website right now, please try again later";
                } else {
                    $location.url("/user/" + uid + "/website");

                }
            })
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        console.log("In EditWebsiteController");
        var vm = this;

        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService.findWebsiteById(vm.wid)
                .success(function (website) {
                    vm.website = website
                })

            WebsiteService.findWebsitesByUser(vm.uid)
                .success(function (websites) {
                    vm.websites = websites
                })
        }

        init();


        function updateWebsite(wid, website) {
            console.log("In updateWebsite");
            if (website.name === '') {
                vm.error = "Please fill all the fields"

            }
            else {
                WebsiteService.updateWebsite(vm.wid, website)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website");
                    })
                    .error(function () {
                        vm.error("Unable to update the website")
                    });
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function () {
                    vm.error("Unable to delete the website")
                });
            ;


        }

    }

})();



