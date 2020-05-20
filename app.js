const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const expHand = require('express-handlebars');
const fs = require('fs');
const session = require('express-session');
const flash = require('req-flash');
const msg = require('./models/msgFunction');
const file = require('./models/fileHandler');
const upload = require('express-fileupload');
require('dotenv').config();

/* global variables for file name and file path */
let filename, filepath;

/* TWILIO KEYS */
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);
const app = express();

/*  CONFIGURATION    */
app.engine('handlebars', expHand({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(upload());
app.use(session({
    secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());


app.get('/', (req, res) => {
    res.render('index');
});

/*  GET THE PAGE FOR REQUESTING STATUS OF ONE SITE */
app.get('/onesite', (req, res) => {
    res.render('onesite');
});

/*  PROCESS THE FORM FOR ONE SITE AND SEND SMS TO A NUMBER */
app.post('/onesite', (req, res) => {
    let siteName = req.body.site;
    let receiver = req.body.receiver;
    let receiveUpdate = req.body.update;
    let responseCode;

    /* UPDATE THE CLASS VARIABLES */
    msg.siteName = siteName;
    msg.receiver = receiver;

    request(siteName, function (error, response) {
        responseCode = response.statusCode;
        if (error) {
            res.redirect('/onesite')
            console.log(`${siteName} has errors ${error}`);
        } else if (receiveUpdate == 'yes') {
            msg.status = responseCode;
            let localTime = new Date().toLocaleString();
            client.messages.create({
                to: msg.receiver,
                from: msg.sender,
                body: msg.msgFormat()
            });
            res.render('onesite', {
                result: responseCode,
                name: siteName,
                timestap: `Checked at: ${localTime}`
            });
        } else {
            res.render('onesite', {
                result: responseCode,
                name: siteName,
            });
        }
    })

});



/*  GET THE PAGE FOR PARSING MULTIPLE WEBSITES */
app.get('/multisite', (req, res) => {
    res.render('multisite');
});

app.post('/multisite', (req, res) => {
    let uploadedFile, fileName, path;
    let data = [];
    if (req.files) {
        uploadedFile = req.files.uploadedFile;
        fileName = uploadedFile.name;
        path = './uploads/';
        file.uploadFile(uploadedFile, path, fileName);
        file.filename = fileName;
        file.filepath = path;
        
        filename = fileName;
        filepath = path;
    }

    console.table(data);
    res.render('multisite', {
        result: fileName
    });
});


app.get('/renderfile', (req, res) => {
    let data = fs.readFileSync('./uploads/sites.csv').toString().split("\n");
    file.fileToArray(data, file.sitesArray);
    let len = file.sitesArray.length;

    res.render('multisiteresult', {
        sites: file.sitesArray
    });
});


app.post('/deleteFile', (req, res) => {
    file.deleteFile(fs, filepath, filename);
    res.redirect('/');
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Application Has Been Started");
});

//+12019756633