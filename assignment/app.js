module.exports = function (app) {
    console.log("In app.js")
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app,model);
    require("./services/website.service.server.js")(app,model);
    require("./services/page.service.server.js")(app,model);
    require("./services/widget.service.server.js")(app,model);
};
