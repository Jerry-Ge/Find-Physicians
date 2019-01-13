var express = require("express");
var router  = express.Router();
var Physician = require("../models/physicians");
var NodeGeocoder = require("node-geocoder");

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: "AIzaSyBDS3LZoWaHpV-S1u-AFCqSoWbpY0l16eQ",
  formatter: null
};

var geocoder = NodeGeocoder(options);

//root route
router.get("/", function(req, res){
    res.render("index");
});

var mlocation = {};
//handle the addr query from index page
router.post("/query", function(req, res){

	// console.log(req.body.first_name);
	// console.log(req.body.middle_name);
	// console.log(req.body.last_name);
 	
 	var addr = "";
 	Physician.find({first_name : req.body.first_name.toLowerCase(), middle_name : req.body.middle_name.toLowerCase(), last_name : req.body.last_name.toLowerCase()})
 	.then(physicians => {
 		
 		physicians.forEach(function(people){
 			console.log(people.addr_line1);
 			addr += people.addr_line1;
 			addr += ",";
 			addr += people.addr_line2;
 			addr += ",";
 			addr += people.addr_city;
 			addr += ",";
 			addr += people.addr_state;
 			addr += ",";
 			addr += people.addr_zip;
 			addr += ",";
 			addr += people.country;

 			console.log(addr);
			geocoder.geocode(addr, function (err, data) {
				if (err || !data.length) {
					console.log(err);
				}
				var lat = data[0].latitude;
				var lng = data[0].longitude;
				var location = data[0].formattedAddress;
				console.log(location);
				console.log(lat);
				console.log(lng);

				mlocation["lng"] = lng;
				mlocation["lat"] = lat;

				res.render("show", {location : mlocation});
			});

 		});
 		console.log("Success")
 	})
 	.catch(err => {
 		console.log(err.message)
 	})
 
	//res.redirect('/'); 

	// Physicans.find({ id : 110001}, function(err, user) {
	// 	if (err) throw err;

	// 	console.log(user.last_name);
	// })
});

module.exports = router;