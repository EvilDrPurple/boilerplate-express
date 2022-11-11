require('dotenv').config();
let bodyParser = require('body-parser');

let express = require('express');
let app = express();

app.use(function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("Hello World");

app.get('/', (req, res) => {
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

app.get("/now", (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({time: req.time});
    }
);

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({echo: word});
});

app.get("/name", (req, res) => {
    const { first: firstname, last: lastname } = req.query;
    res.json({name: `${firstname} ${lastname}`});
});

app.post("/name", (req, res) => {
    const names = `${req.body.first} ${req.body.last}`;
    res.json({name: names});
});

module.exports = app;
