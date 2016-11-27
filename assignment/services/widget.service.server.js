/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app,models) {
    var model = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

//    var widgetModel = models.widgetModel;
   
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
        var pid = req.params.pid;
        console.log([start, end]);

        model
            .reorderWidgets(pid, start, end)
            .then(
                function (res) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
    function uploadImage(req,res){
        console.log("In uploadImage api")
        console.log(req.body)
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
        var newWidget = {
            url: "/uploads/" +filename,
            name:req.body.name,
            width:req.body.width

        }
        model
            .updateWidget(wgid, newWidget)
            .then(
                function (status) {
                    res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget");
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }
    function createWidget(req, res) {
        console.log("In createWidget api")
        model
            .createWidget(req.params.pid, req.body)
            .then(
                function (widget) {

                    console.log("In createWidget api"+widget)
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        console.log("In findAllWidgetsForPage api")
        var pid = req.params.pid;
        model
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        console.log("In findWidgetById api: "+req.params.wgid)
        var wgid = ""+req.params.wgid;
        model
            .findWidgetById(wgid)
            .then(
                function (widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        console.log("In updateWidget api")
        var id = ""+req.params.wgid;
        var newWidget = req.body;
        model
            .updateWidget(id, newWidget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        console.log("In deleteWidget api")
        var id = ""+req.params.wgid;
        model
            .deleteWidget(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

}