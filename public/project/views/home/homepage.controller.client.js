/**
 * Created by Nikhil on 12/11/16.
 */
(function () {
    angular
        .module("YourNews")
        .controller("HomePageController", HomePageController)
        .controller("UserSourcesController", UserSourcesController)
        .controller("UserAddSourcesController",UserAddSourcesController)
        .controller("LinksController",LinksController)
        .controller("SearchController",SearchController)

    function HomePageController($routeParams, NewsSourceService,UserService, $location) {
        console.log("In HomePageController");
         var vm = this;
         vm.uid = $routeParams.uid
        vm.sname = $routeParams.sname
        vm.saveLink = saveLink;
        function init() {
            NewsSourceService.getNewsForCurrentUser(vm.uid,vm.sname)
                .success(function (news) {
                    console.log("news:",news)
                    vm.news = news;
                })
        }

        function saveLink(news) {
            console.log("in saveLink")
            var link = { url : news.url , description : news.title}
            UserService.addLink(vm.uid,link)
                .success(function (user) {
                })
        }

        init();

    }

    function LinksController($routeParams,UserService, $location) {
        console.log("In LinksController");
        var vm = this;
        vm.uid = $routeParams.uid

        function init() {
            UserService.getLinksForUser(vm.uid)
                .success(function (links) {
                    console.log("links:",links)
                    vm.links = links;
                })
        }

        init();

    }
    function UserSourcesController($routeParams, UserService, $location) {
        console.log("In UserSourcesController");
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.deleteSource = deleteSource;

        function init() {
            UserService.findSourcesForUsers(vm.uid)
                .success(function (sources) {
                    // console.log(sources)
                    vm.sources = sources;
                })
        }

        init();

        function deleteSource(source) {
            console.log("In deleteSource")
            UserService.deleteSource(vm.uid ,source._id)
                .success(function (source) {
                    if (source === null) {
                         vm.error = "Unable to remove the source now, please try again later.";
                    } else {
                        init();
                        vm.message = "Source successfully removed";

                    }
                })

        }


    }

    function UserAddSourcesController($routeParams, NewsSourceService,UserService, $location) {
        console.log("In NewsSourcesController");
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.addSource = addSource;


        function init() {
            NewsSourceService.getExistingNewsSources()
                .success(function (response) {
                    console.log(response)
                    vm.sources = response;
                })
        }

        init();

        function addSource(source) {
            UserService.addSource(vm.uid ,source)
                .success(function (source) {
                    if (source === null) {
                        vm.error = "Unable to add the source now, please try again later.";
                    } else {
                        vm.message = "Source successfully added";
                        $location.url("/user/"+vm.uid+"/sources");

                    }
                })

        }
    }

    function SearchController($routeParams, UserService, $location) {
        console.log("In NewsSourcesController");
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.search = search;
        vm.clear = clear;

        function search(searchString) {
            UserService.search(searchString)
                .success(function (users) {
                    console.log(users)
                    if (users === null) {
                        vm.error = "Unable to add the source now, please try again later.";
                    } else {
                        vm.users = users;
                    }
                })

        }
        function clear() {
            vm.users=[];
        }

    }



})();
