/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app,models) {
    var model = models.websiteModel;
    // var websites = [
    //     {"_id": "123", "name": "Facebook", "developerId": "456"},
    //     {"_id": "234", "name": "Tweeter", "developerId": "456"},
    //     {"_id": "456", "name": "Gizmodo", "developerId": "456"},
    //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
    //     {"_id": "678", "name": "Checkers", "developerId": "123"},
    //     {"_id": "789", "name": "Chess", "developerId": "234"}
    // ];

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);


    function createWebsite(req, res) {
        console.log("In createWebsite api")
        var uid = req.params.uid;
        var website = req.body;

        model
            .createWebsiteForUser(uid, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    function updateWebsite(req, res) {
        console.log("In updateWebsite api")
        var id = req.params['wid'];
        var newWebsite = req.body;

        model
            .updateWebsite(id, newWebsite)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        console.log("In deleteWebsite api")
        model
            .deleteWebsite(req.params.wid)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        console.log("In findAllWebsitesForUser api")
        var uid = req.params.uid;

        model
            .findAllWebsitesForUser(uid)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findWebsiteById(req, res) {
        console.log("In findWebsiteById api")
        var wid = req.params.wid;
        model
            .findWebsiteById(wid)
            .then(
                function (website) {
                    res.send(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }


};

