/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {


        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
        };
        return api;

        function sort(start, end) {
            var url = "/api/widget/sort?start=START&end=END";
            url = url
                .replace("START", start)
                .replace("END", end);
            $http.put(url);
        }

        function createWidget(pageId, widget) {
//            widgets.push(widget)
            var newWidget = {
                widgetType: widget.widgetType,
                pageId: pageId
            };
            return $http.post("/api/page/" + pageId + "/widget", newWidget);
        }

        function findWidgetsByPageId(pageId) {
            console.log("In findWidgetsByPageId")
            // var widgetsList = [];
            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (widget.pageId === pageId) {
            //         widgetsList.push(widget);
            //     }
            // }
            // return widgetsList;
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            console.log("In findWidgetById")
            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (widget._id === widgetId) {
            //         return widget;
            //     }
            // }
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            console.log("In updateWidget : ", widgetId)
            // for (var w in widgets) {
            //     var wg = widgets[w];
            //     if (wg._id === widgetId) {
            //         widget[w] = widget;
            //     }
            // }
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);

        }

        function deleteWidget(widgetId) {
            // var leftWidgets = [];
            // for (var w in widgets) {
            //     var widget = widgets[w];
            //     if (widget._id !== widgetId) {
            //         leftWidgets.push(widget)
            //     }
            // }
            // widgets = leftWidgets;

            return $http.delete("/api/widget/" + widgetId);

        }
    }
})();