/**
 * Created by Nikhil on 11/23/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("Widget", widgetSchema);

    var api = {
        createWidget: createWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets: reorderWidgets,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById
    };
    return api;
    
    function createWidget(pid, widget) {
        console.log("In createWidget model")

        widget._page = pid;
        console.log(widget)
        return widgetModel
            .find({_page: pid})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return widgetModel.create(widget);
                }
            );
    }

    function updateWidget(wid, widget) {
        console.log("In updateWidget model:"+wid)
        console.log(widget)
        delete widget._id;
        return widgetModel
            .update({_id: wid}, {
                $set: widget
            });
    }

    function deleteWidget(wid) {
        console.log("In deleteWidget model")
        return widgetModel.remove({_id: wid});
    }


    function findAllWidgetsForPage(pid) {
        console.log("In findAllWidgetsForPage model")
        return widgetModel.find({_page: pid});
    }

    function findWidgetById(wid) {
        console.log("In findWidgetById model")
        return widgetModel.findById(wid);
    }
    

    function reorderWidgets(pid, start, end) {
        console.log("In reorderWidgets model")
        var startIndex = parseInt(start);
        var endIndex = parseInt(end);

        return widgetModel
            .find({_page: pid},
                function (err, widgets) {
                widgets.forEach(function (widget) {
                    if(startIndex > endIndex) {
                        if(widget.order >= endIndex && widget.order < startIndex) {
                            widget.order++;
                            widget.save(function () {
                            });
                        } else if (widget.order === startIndex) {
                            widget.order = endIndex;
                            widget.save(function () {
                            });
                        }
                    }
                    else {
                        if(widget.order === startIndex) {
                            widget.order = endIndex;
                            widget.save(function () {
                            });
                        } else if(widget.order > startIndex && widget.order <= endIndex) {
                            widget.order--;
                            widget.save(function () {
                            });
                        }
                    }
                });
            });
    }
}
