/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app,models) {
    var model = models.pageModel;
    // var pages = [
    //     {"_id": "321", "name": "Post 1", "wid": "456"},
    //     {"_id": "432", "name": "Post 2", "wid": "789"},
    //     {"_id": "543", "name": "Post 3", "wid": "456"}
    // ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        console.log("In createPage api")
        var websiteId = req.params.wid;
        var page  = req.body;
        model
            .createPage(websiteId, page)
            .then(
                function (page) {
                    console.log(page);
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        console.log("In findAllPagesForWebsite api")
        var websiteId = req.params.wid;
        model
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findPageById(req, res) {
        console.log("In findPageById api")
        var pageId = req.params.pid;
        model
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function updatePage(req, res) {
        console.log("In updatePage api")
        var pid = req.params.pid;
        var page = req.body;
        model
            .updatePage(pid, page)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deletePage(req, res) {
        console.log("In deletePage api")
        var pid = req.params.pid;

        model
            .deletePage(pid)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};
