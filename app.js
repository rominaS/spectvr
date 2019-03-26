const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cookie = require('cookie');
const session = require('express-session');
const mongodb = require('mongodb')
const uri = process.env.MONGODB_URI || 'mongodb://SpectVRAdmin:spectvr1@ds159926.mlab.com:59926/heroku_rc0df5jw';

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2' // region of your bucket
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'spectvr',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const router = express.Router();
const singleUpload = upload.single('image')

router.post('/image-upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
})
module.exports = router;

app.use(express.static('static'));
let db;

//Authenication -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(session({
    secret: 'rapier',
    resave: false,
    saveUninitialized: true,
}));

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

const { body, param } = require('express-validator/check');
const { sanitizeBody, sanitizeParam } = require('express-validator/filter');

const validateBody = [
  sanitizeBody('*')
    .trim()
    .escape()
];

const validateParam = [
  sanitizeParam('*')
    .trim()
    .escape()
];

app.post('/signup/',validateBody, validateParam,  function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let salt = generateSalt();
    let hash = generateHash(password, salt);
    db.collection("Users").insertOne( {username: username, password: hash, salt: salt, purchases: {}} , {upsert: true}, function(err){
        if (err) return res.status(500).end(err);
        // initialize cookie
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                path : '/', 
                maxAge: 60 * 60 * 24 * 7
        }));
        return res.json("user " + username + " signed up");
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/',validateBody, validateParam,  function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    // retrieve user from the database
    db.collection("Users").findOne( {username: username}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("access denied null");
        if (user.password !== generateHash(password, user.salt)) return res.status(401).end("access denied wrong pass"); 
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


//Purchasing Content ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/purchase/:_id', validateBody, validateParam, isAuthenticated, function (req, res, next) {
    db.collection("Users").updateOne( {username: req.session.username }, { $push: { "purchases": req.params._id } },  function(err, user) {
            if (err) return res.status(500).end(err);
            return res.json(user);
    });
});

//Server Management -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let privateKey = fs.readFileSync( 'server.key' );
let certificate = fs.readFileSync( 'server.crt' );
let config = {
    key: privateKey,
    cert: certificate
};

const http = require('http');
const PORT = process.env.PORT || 3000;

mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

	db = client.db();
    console.log("Database connected");

	http.createServer(app).listen(PORT, function (err) {
    	if (err) console.log(err);
    	else console.log("HTTPS server started on port", PORT);
	});
});
