/**
 * Created by Nikhil on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)


    function WidgetListController($routeParams, WidgetService, $sce) {
        console.log("In WidgetListController");
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutube = checkSafeYoutube;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function (response) {
                   // console.log(response.data)
                     vm.widgets = response.data;
                    // $(".wam-widgets")
                    //     .sortable({
                    //         axis: 'y'
                    //     });
                });
        }
        init();
        function checkSafeHtml(html) {

            return $sce.trustAsHtml(html);
        }

        function checkSafeYoutube(url) {
            var parts = url.split('/')
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        console.log("In NewWidgetController");
        var vm = this;
        vm.createWidget = createWidget;

        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];

        function createWidget(type) {
            console.log('In createWidget:'+type);
            var widget = {
                type: type
            }
            WidgetService.createWidget(vm.pid, widget)
                .success(function (response) {
                    console.log(response)
                    var newWidget = response;
                        if (newWidget._id) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + newWidget._id);
                    }
                })
                .error(function () {
                    vm.error = "Unable to create widget";
                });
//
     //       $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
//
        }

    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        console.log("In EditWidgetController");
        var vm = this;

        vm.uid = $routeParams["uid"];
        vm.pid = $routeParams["pid"];
        vm.wid = $routeParams["wid"];
        vm.wgid = $routeParams["wgid"];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (response) {
                    vm.widget = response;
                })
                .error(function(){
                    console.log("ERROR");
                });
        }
        init();

        function updateWidget(widget) {
            if(widget.name ==='' || widget.name == undefined)
            {
                vm.error = "Please fill all the fields"

            }
            else{
            WidgetService
                    .updateWidget(vm.wgid, widget)
                .success(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function () {
                        vm.error = "Unable to update widget";
                    });}
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function () {
                        vm.error = "Unable to delete widget";
                    });
        }
    }

})();