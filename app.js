var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

mongoose = require("mongoose");
Physicians = require("./models/physicians");
mongoose.connect("mongodb://localhost:27017/medical");

//requiring routes
var indexRoutes = require("./routes/index")


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

//express-validator
app.use(expressValidator()); 


app.use("/", indexRoutes);


app.listen(80, function(){
	console.log('Server Started On Port 80...');
})
