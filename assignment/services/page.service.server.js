/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app) {

    var pages = [
        {"_id": "321", "name": "Post 1", "wid": "456"},
        {"_id": "432", "name": "Post 2", "wid": "789"},
        {"_id": "543", "name": "Post 3", "wid": "456"}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        console.log("In createPage api")
        pages.push(req.body);
        res.send(req.body);
    }

    function findAllPagesForWebsite(req, res) {
        console.log("In findAllPagesForWebsite api")
        var websiteId = req.params.websiteId;
        var result = [];

        for (var p in pages) {
            if (pages[p].wid === websiteId)
                result.push(pages[p]);
        }
        res.json(result);
    }

    function findPageById(req, res) {
        console.log("In findPageById api")
        var pageId = req.params['pageId'];
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.send(pages[p])
                return
            }
        }

    }

    function updatePage(req, res) {
        console.log("In updatePage api")
        var newPage = req.body;
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = newPage;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res) {
        console.log("In deletePage api")
        var pageId = req.params.pageId;

        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);

    }
};
