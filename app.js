const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static(__dirname + '/public'));
path = require('path');
const script = express();
script.use(express.static(path.join('../app')));
app.set('view engine', 'ejs');
const fetch = require('node-fetch');
app.use(bodyParser.urlencoded({extended: true}));
var request = require('request');
const {response} = require("express");
let output = "";

app.get("/", (req, res) => {

    res.render('index', {output: ""});

})

app.post("/", (req, res) => {

    
    if (req.body.method == "GET") {
        get();
    } else 
        post();
    
    function get() {
        fetch(req.body.url)
            .then(response => response.json())
            .then(data => {
                let output = JSON.stringify(data);
                res.render("index", {output: output});

            });

    }

    /////////////post//////////////

    function post() {
        fetch(req.body.url, {
            method: 'POST',
            headers: {
                'Content-Type': req.body.header
            },
            body: (req.body.base)
        })
            .then(res => res.json())
            .then(data => {

                let output = JSON.stringify(data);
                res.render("index", {output: output});

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

})

app.listen(3000, () => {

    console.log("server running at port 3000");
})
