module.exports = function (app,passport) {
    console.log("In app.js")
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app,model,passport);
    require("./services/news-sources.service.server.js")(app,model);
};
