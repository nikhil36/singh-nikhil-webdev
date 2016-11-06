/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app) {
    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456"},
        {"_id": "234", "name": "Tweeter", "developerId": "456"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
        {"_id": "678", "name": "Checkers", "developerId": "123"},
        {"_id": "789", "name": "Chess", "developerId": "234"}
    ];


    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);


    function createWebsite(req, res) {
        console.log("In createWebsite api")
        websites.push(req.body);
        res.send(req.body);
    }

    function findAllWebsitesForUser(req, res) {
        console.log("In findAllWebsitesForUser api")
        var uid = req.params.userId;
        var websts = [];
        for (var w in websites) {
            if (websites[w].developerId === uid) {
                websts.push(websites[w]);
            }
        }
        res.json(websts)

    }

    function findWebsiteById(req, res) {
        console.log("In findWebsiteById api")
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === websiteId)
            {
                res.send(websites[w]);
                return;
            }
        }
    }

    function updateWebsite(req, res) {
        console.log("In updateWebsite api")
        var id = req.params['websiteId'];
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id === id) {
                websites[w] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWebsite(req, res) {
        console.log("In deleteWebsite api")
        var webId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === webId)
            {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};

