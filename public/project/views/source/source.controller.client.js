/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("YourNews")
        .controller("EditSourceController", EditSourceController)


    function EditSourceController($routeParams, NewsSourceService) {
        console.log("In EditSourcesController");
        var vm = this;
        vm.mode = "EDIT";
        function init() {
            AdminService.getExistingNewsSources()
                .success(function (response) {
                    vm.sources = response;
                })
        }

        init();

    }


})();
