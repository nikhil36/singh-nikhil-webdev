/**
 * Created by Nikhil on 10/11/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            // {"_id": "789", "widgetType": "HTML", "pageId": "432", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
        };
        return api;

        function createWidget(pageId, widget) {
            widgets.push(widget)

        }

        function findWidgetsByPageId(pageId) {
            console.log("In findWidgetsByPageId")
            var widgetsList = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === pageId) {
                    widgetsList.push(widget);
                }
            }
            return widgetsList;
        }

        function findWidgetById(widgetId) {
            console.log("In findWidgetById")
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    return widget;
                }
            }
        }

        function updateWidget(widgetId, widget) {
            console.log("In updateWidget : ", widgetId)
            for (var w in widgets) {
                var wg = widgets[w];
                if (wg._id === widgetId) {
                    widget[w] = widget;
                }
            }

        }

        function deleteWidget(widgetId) {
            var leftWidgets = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id !== widgetId) {
                    leftWidgets.push(widget)
                }
            }
            widgets = leftWidgets;

        }
    }
})();