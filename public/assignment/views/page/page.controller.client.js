/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)


    function PageListController($routeParams, PageService) {
        console.log("In PageListController");
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        function init() {
             PageService.findPageByWebsiteId(vm.wid)
                 .success(function (pages) {
                     vm.pages = pages;
                 })
        }
        init();

    }

    function NewPageController($routeParams,$location,PageService) {
        console.log("In NewPageController");
        var vm = this;
        vm.wid = $routeParams["wid"];
        vm.uid = $routeParams["uid"];
        vm.createPage = createPage;

        function createPage(name, title,wid) {
            console.log("In createPage",[name, title,wid]);

            if(name == undefined || title == undefined)
            {
                vm.error = "Please fill all the fields"
                return
            }
            page = {_id: ''+Math.round(getRandomArbitrary(800,900)),
                name: name, wid: wid}

           PageService.createPage(vm.wid,page)
               .success(function(page){
                   if (page === null) {
                       vm.error = "Unable to create a page right now, please try again later";
                   } else {
                       console.log("User:", vm.uid)
                       $location.url("/user/" + vm.uid+"/website/"+wid+"/page/");

                   }
               })
               .error(function(){
                       vm.error = "Unable to create a page right now, please try again later";
               })


        }
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

    }

    function EditPageController($routeParams, PageService) {
        console.log("In EditPageController");
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        vm.pageId = $routeParams.pid;
        function init() {
            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
        }
        init();


        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }


    }

})();