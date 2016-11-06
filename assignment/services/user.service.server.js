module.exports = function (app) {
    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: 'alice@a.com'
        },
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: 'bob@a.com'},
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: 'charly@a.com'
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: 'jose@a.com'
        }
    ];


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
        var username = req.query.username
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                found = true;
                res.send(user);
                return;
            }
        }
        res.send("0");
    }

    function findUserById(req, res) {
        console.log("In findUserById api")
        var userID = req.params.uid
        for (var u in users) {
            var user = users[u];
            if (user._id === userID) {
                found = true;
                res.send(user);
                return;
            }
        }
        res.send("0");
    }

    function findUserByCredentials(req, res) {
        console.log("In findUserByCredentials api")
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            var user = users[u];
            if (user.username === username && user.password === password) {
                res.send(user);
                return;
            }
        }
        res.send("0");
    }

    function createUser(req, res) {
        console.log("In createUser api")
        var user = req.body;
        users.push(user)
        res.send(user)
    }

    function updateUser(req,res){
        console.log("In updateUser api")
        var user = req.body;
        var uid = req.params['uid'];
        for (var u in users) {
            if (users[u]._id === uid) {
                users[u] = user;
            }
        }
        // console.log(users)
        res.sendStatus(200);

    }

    function unregisterUser(req,res){
        console.log("In unregisterUser api")
        var uid = req.params['uid'];

        for (var u in users) {
            if (users[u]._id === uid) {
                users.splice(u, 1);
            }
        }
        res.sendStatus(200);

    }
}