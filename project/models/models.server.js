/**
 * Created by Nikhil on 11/12/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    // var connectionString = 'mongodb://127.0.0.1:27017/fall2016';

     // var connectionString = 'mongodb://localhost/fall2016';
    // var connectionString = 'mongodb://nikhilsingh:webdev@ds041556.mlab.com:41556/webbed';

    // mongoose.connect(connectionString);
    console.log("connected to DB")
    var models = {
        projectUserModel: require("./user/user.model.server")(),
        sourcesModel: require("./newSources/news-sources.model.server")(),
        // websiteModel: require("./website/website.model.server")(),
        // pageModel: require("./page/page.model.server")(),
        // widgetModel: require("./widget/widget.model.server")()
    };
     return models;
};
