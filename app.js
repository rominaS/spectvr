const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cookie = require('cookie');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://<dbuser>:<dbpassword>@ds159926.mlab.com:59926/heroku_rc0df5jw';
const client = new MongoClient(uri, { useNewUrlParser: true });
app.use(express.static('frontend'));
let db;
//Authenication -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(function (req, res, next){
    console.log("HTTPS request", req.method, req.url, req.body);
    req.username = ('username' in req.session)? req.session.username : null;
    next();
});

let isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

app.post('/signup/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    db.collection("Users").find({username: username}, function(err, user){
    	console.log(user);
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        let salt = generateSalt();
        let hash = generateHash(password, salt);
        db.collection("Users").insertOne({username: username}, {username: username, hash, salt}, {upsert: true}, function(err){
            if (err) return res.status(500).end(err);
            // initialize cookie
            res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                  path : '/', 
                  maxAge: 60 * 60 * 24 * 7
            }));
            return res.json("user " + username + " signed up");
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    users.findOne({_id: username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied");
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); 
        req.session.username = username;
        // initialize cookie
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
              path : '/', 
              maxAge: 60 * 60 * 24 * 7
        }));
        return res.json("user " + username + " signed in");
    });
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.json("user has signed out");
});

//Server Management -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let privateKey = fs.readFileSync( 'server.key' );
let certificate = fs.readFileSync( 'server.crt' );
let config = {
    key: privateKey,
    cert: certificate
};

const https = require('https');
const PORT = process.env.PORT || 3000;

client.connect(function(err) {
	db = client.db("SpectVR");
	https.createServer(config, app).listen(PORT, function (err) {
    	if (err) console.log(err);
    	else console.log("HTTPS server on https://localhost:%s", PORT);
        db.collection("Users").insertOne( {username: "Charles", password: "Ruan"} );
	});
});
