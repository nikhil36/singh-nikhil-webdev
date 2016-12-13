module.exports = function (app, models,passport) {
    // console.log("User service")
    // var session = require('express-session');
    // var passport = require('passport');
    // var cookieParser = require('cookie-parser');
    var bcrypt = require("bcrypt-nodejs");


    // app.use(session({
    //     secret: 'this is the secret 2',
    //     resave: true,
    //     saveUninitialized: true
    // }));
    // app.use(cookieParser());
    // app.use(passport.initialize());
    // app.use(passport.session());


    var LocalStrategy1 = require('passport-local').Strategy;
    // var GoogleStrategy1 = require('passport-google-oauth').OAuth2Strategy;
    // var FacebookStrategy1 = require('passport-facebook').Strategy;


    // var googleConfig1 = {
    //     clientID: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL: 'http://127.0.0.1:5000/auth/project/google/callback'
    // };

    // console.log(googleConfig.clientID);
    // var facebookConfig1 = {
    //     clientID: process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL: process.env.FACEBOOK_CALLBACK_URL
    // };

    // passport.use(new FacebookStrategy1(facebookConfig1, facebookStrategy1));
    // passport.use(new GoogleStrategy1(googleConfig1, googleStrategy1));
    passport.use('project',new LocalStrategy1(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var model = models.projectUserModel;
    app.get("/api/user/search/:ss", searchUser);
    app.get("/api/user/:uid/links", getLinksForUser);
    app.post("/api/user/:uid/link", addLink);
    app.post("/api/user/:uid/addSource", addSourceToUser);
    app.get("/api/user/:uid/sources", findSourcesForUser);
    app.get("/api/user/:uid/deleteSource/:sid", deleteSourceForUser);
    app.post('/api/project/admin/makeAdmin',makeAdmin);
    app.post('/api/project/checkAdmin', checkAdmin);
    app.get('/api/project/user', findUser);
    app.get('/api/project/users', findAllUsers);
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/checkLogin', checkLogin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/user', createUser);
    app.get('/api/project/user/:uid', findUserById);
    // app.get('/api/admin/user', findAllUsers);
    app.put('/api/project/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/project/user/:uid', loggedInAndSelf, unregisterUser);
    app.post('/api/project/register', register);


    // app.get('/auth/project/facebook', passport.authenticate('facebook', {scope: 'email'}));
    // app.get('/auth/project/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect: '/project/#/user',
    //         failureRedirect: '/project/#/login'
    //     }));
    //
    // app.get('/auth/project/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    // app.get('/auth/project/google/callback',
    //     passport.authenticate('google', {
    //         successRedirect: '/project/#/user',
    //         failureRedirect: '/project/#/login'
    //     }));


    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;

        if (self && loggedIn) {
            next();
        }
        else {
            if(req.user.role=='ADMIN')
                next();
            else
                res.sendStatus(400);
        }
    }

    function checkLogin(req, res) {
        console.log("In project checkLogin api:", req.isAuthenticated())
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == "ADMIN";
        if (loggedIn && isAdmin) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        console.log("In project logout api")
        req.logout();
        res.send(200);
    }


    function login(req, res) {
        console.log("In project login api")
        var user = req.user;
        res.json(user);
    }

    function findUser(req, res) {
        console.log("In project findUser api")
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res)
        }
        else if (query.username) {
            findUserByUsername(req, res)
        }
        else {
            console.log("user in server:", req.user)
            res.json(req.user)
        }
    }

    function findAllUsers(req, res) {
        console.log("In project findAllUsers api")
        model.getAll().then(
            function (user) {
                res.json(user);
            },
            function (error) {
                res.statusCode(404).send(error);
            }
        );
    }

    function findUserByUsername(req, res) {
        console.log("In project findUserByUsername api")
        model
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.uid;
        console.log("In project findUserById api: " + id)
        model
            .findUserById(id)
            .then(
                function (user) {

                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findUserByCredentials(req, res) {
        console.log("In project findUserByCredentials api")
        var username = req.query.username;
        var password = bcrypt.compareSync(req.query.password);
        model
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createUser(req, res) {
        console.log("In project createUser api")
        var user = req.body;
        model
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    };

    function updateUser(req, res) {
        console.log("In project updateUser api")
        var uid = req.params.uid;
        var newUser = req.body;
        model
            .updateUser(uid, newUser)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function unregisterUser(req, res) {
        console.log("In project unregisterUser api")
        var uid = req.params.uid;

        model
            .deleteUser(uid)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function facebookStrategy1(token, refreshToken, profile, done) {
        model
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {

                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy1(token, refreshToken, profile, done) {
        console.log("In project googleStrategy1")
        model
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.createUser(newGoogleUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("In project projectSerializeUser api")
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("In project projectDeserializeUser api")
        model
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        console.log("In project localStrategy api")
        model
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }
    function makeAdmin(req,res){
        model
            .makeAdmin(req.body)
            .then(
                function (user) {
                    if (user) {
                        req.login(req.user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );

    }
    function findSourcesForUser(req,res){
        var uid = req.params.uid;
         model
             .findUserById(uid)
             .populate("sources")
                .exec(function (err, user) {
                if (err) return res.statusCode(404).send(err);
                console.log("user",user)
                    res.json(user.sources)

            });
    }

    function addSourceToUser(req,res){
        var uid = req.params.uid;
        return model.findUserById(uid).then(
            function (user) {
                // console.log("user",user.sources)
                // console.log("req",req.body)
                console.log(user.sources.indexOf(req.body))
                if ( user.sources.indexOf(req.body._id) === -1) {
                    user.sources.push(req.body);
                }
                user.save();
                res.json(user.sources);
            },function(error){
                console.log(error)}
        );
    }
    function deleteSourceForUser(req,res){
        var uid = req.params.uid;
        var sid = req.params.sid;
        return model.findUserById(uid).then(
            function (user) {
                user.sources.splice(user.sources.indexOf(sid),1);
                user.save();
                res.json(user.sources);
            },function(error){
                console.log(error)}
        );
    }


    function addLink(req,res){
        var uid = req.params.uid;
        var link = req.body;
        return model.findUserById(uid).then(
            function (user) {
                    user.links.push(link);
                user.save();
                res.json(user);
            },function(error){
                console.log(error)}
        );
    }

    function getLinksForUser(req,res){
        var uid = req.params.uid;
        model
            .findUserById(uid)
            .then(
                function (user) {
                    res.json(user.links);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function searchUser(req,res){
        var searchString = req.params.ss;
        model
            .searchUsers(searchString)
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

}