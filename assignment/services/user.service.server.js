module.exports = function (app,models) {
    var model = models.userModel;
    // var users = [
    //     {
    //         _id: "123",
    //         username: "alice",
    //         password: "alice",
    //         firstName: "Alice",
    //         lastName: "Wonder",
    //         email: 'alice@a.com'
    //     },
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: 'bob@a.com'},
    //     {
    //         _id: "345",
    //         username: "charly",
    //         password: "charly",
    //         firstName: "Charly",
    //         lastName: "Garcia",
    //         email: 'charly@a.com'
    //     },
    //     {
    //         _id: "456",
    //         username: "jannunzi",
    //         password: "jannunzi",
    //         firstName: "Jose",
    //         lastName: "Annunzi",
    //         email: 'jose@a.com'
    //     }
    // ];


    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',unregisterUser);

    function findUser(req, res) {
        console.log("In findUser api")
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res)
        }
        else if (query.username) {
            findUserByUsername(req, res)
        }
    }

    function findUserByUsername(req, res) {
        console.log("In findUserByUsername api")
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
        console.log("In findUserById api: "+id)
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
        console.log("In findUserByCredentials api")
        var username = req.query.username;
        var password = req.query.password;
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
        console.log("In createUser api")
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
            )};

    function updateUser(req,res){
        console.log("In updateUser api")
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

    function unregisterUser(req,res){
        console.log("In unregisterUser api")
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
}