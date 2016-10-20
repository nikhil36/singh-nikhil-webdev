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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
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
            console.log('In createWidget');
            vm.wgid = '' + Math.round(getRandomArbitrary(800, 900));
            vm.widget;
            if (type === "Header") {
                vm.widget = {"_id": vm.wgid, "widgetType": "HEADER", "pageId": vm.pid, "size": 2, "text": ""};
            }
            else if (type === "Image") {
                vm.widget = {
                    "_id": vm.wgid, "widgetType": "IMAGE", "pageId": vm.pid, "width": "100%",
                    "url": ""
                }
            }
            else if (type === "YouTube") {
                vm.widget = {
                    "_id": vm.wgid, "widgetType": "YOUTUBE", "pageId": vm.pid, "width": "100%",
                    "url": ""
                }
            }
            WidgetService.createWidget(vm.wgid, vm.widget)

            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);

        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
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
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        init();

        function updateWidget(widget) {
            console.log('In updateWidget');
            WidgetService.updateWidget(vm.wgid, widget);
        }

        function deleteWidget() {
            console.log('In deleteWidget');
            WidgetService.deleteWidget(vm.wgid);

        }


    }

})();