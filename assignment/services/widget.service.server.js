/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

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

    app.post ("/api/uploads", upload.single('file'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/sort", sortWidget);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);


    function sortWidget(req,res)
    {
        var start = req.query.start;
        var end = req.query.end;
        console.log("sortWidget:",[start,end])
        // console.log(widgets)
        widgets.splice(end,0,widgets.splice(start,1)[0])
        // console.log(widgets)
        return
    }
    function uploadImage(req,res){
        console.log("In uploadImage api")
        var wid= req.body.websiteId;
        var width= req.body.width;
        var file= req.file;
        var wgid= req.body.widgetId;
        var uid= req.body.userId;
        var pid= req.body.pageId;

        if(file == null) {
            res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid);
            return;
        }

        var originalname  = file.originalname; // file name on user's computer
        var filename      = file.filename;     // new file name in upload folder
        var path          = file.path;         // full path of uploaded file
        var destination   = file.destination;  // folder where file is saved to
        var size          = file.size;
        var mimetype      = file.mimetype;

        for(var w in widgets) {
            if(widgets[w]._id === wgid) {
                widgets[w].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/" + wgid);
    }
    function createWidget(req, res) {
        console.log("In createWidget api")
        var widget = req.body;
        widget._id = (new Date()).getTime()+"";
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        console.log("In findAllWidgetsForPage api")
        var pid = req.params.pid;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        console.log("In findWidgetById api: "+req.params.wgid)
        var wgid = ""+req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === wgid) {
                res.send(widgets[w]);

                return;
            }
        }
        res.send({});
    }

    function updateWidget(req, res) {
        console.log("In updateWidget api")
        var id = ""+req.params.wgid;
        var newWidget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === id) {
                widgets[w].name = newWidget.name;
                widgets[w].text = newWidget.text;
                if(widgets[w].widgetType === 'HEADER') {
                    widgets[w].size = newWidget.size;
                    res.sendStatus(200);
                    return;
                }
                if(widgets[w].widgetType === 'IMAGE' || widgets[w].widgetType === 'YOUTUBE') {
                    widgets[w].url = newWidget.url;
                    widgets[w].width = newWidget.width;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res) {
        console.log("In deleteWidget api")
        var id = ""+req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === id) {
                widgets.splice(w, 1);
                res.sendStatus(200)
                return;
            }
        }
        res.sendStatus(400);
    }

}