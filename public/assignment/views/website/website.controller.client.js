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
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();
    }

    function NewWebsiteController($routeParams,$location, WebsiteService) {
        console.log("In NewWebsiteController");
        var vm = this;
        vm.createWebsite = createWebsite;

        vm.uid = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();

        function createWebsite(name, desc,uid) {
            if(name == undefined || desc == undefined)
            {
                vm.error = "Please fill all the fields"
                return
            }
            website = {_id: ''+Math.round(getRandomArbitrary(800,900)),
                name: name, developerId: uid}

            website = WebsiteService.createWebsite(uid,website);

            if (website === null) {
                vm.error = "Unable to create a website right now, please try again later";
            } else {
                $location.url("/user/" + uid+"/website");

            }
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }
        init();


        function updateWebsite(wid,website) {
            console.log("In updateWebsite");
            WebsiteService.updateWebsite(vm.wid, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);

                $location.url("/user/" + vm.uid+"/website");


        }

    }

})();



