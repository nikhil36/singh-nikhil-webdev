/**
 * Created by Nikhil on 10/24/16.
 */
module.exports = function (app, models) {
    var model = models.sourcesModel;
    app.get('/api/project/admin/sources', getNewsSources);
    app.post('/api/project/admin/addSource', addSource);
    app.get('/api/project/user/:uid/news/:sname', getNews);
    app.delete('/api/project/admin/removeSource/:sid', removeSource);

    var request = require("request");
    var async = require('async');


    function getNewsSources(req, res) {
        console.log("In getNewsSources api")
        model
            .findAllSources()
            .then(
                function (sources) {
                    res.json(sources);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function getNews(req, res) {

        console.log("In getNews api")
        var sname = req.params.sname;
        request.get('https://www.newsapi.org/v1/articles?source=' + sname + '&apiKey=' + process.env.API_KEY, function (error, response, body) {
            console.log('https://www.newsapi.org/v1/articles?source=' + sname + '&apiKey=' + process.env.API_KEY)
            if (!error && response.statusCode == 200) {
                // console.log(JSON.parse(body).articles) // Show the HTML for the Google homepage.
                res.json(JSON.parse(body).articles)
            }
            else {
                console.log("error", error)
            }
        })


    }

    function addSource(req, res) {
        console.log("In addSource api:", req.body)
        model
            .createSource(req.body)
            .then(
                function (source) {
                    res.json(source);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }


    function removeSource(req, res) {
        var sid = req.params.sid;
        console.log("In removeSource api:")
        model
            .deleteSource(sid)
            .then(
                function (source) {
                    res.json(source);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

};
