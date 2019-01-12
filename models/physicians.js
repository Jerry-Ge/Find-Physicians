var mongoose = require("mongoose");

var physicianSchema = new mongoose.Schema({
	addr_city: {type:String},
	first_name: {type:String},
	last_name: {type:String},
	middle_name: {type:String},
	country: {type:String},
	addr_line1: {type:String},
	addr_zip: {type:String},
	addr_state: {type:String},
	id: {type:String},
	addr_line2: {type:String}
});

module.exports = mongoose.model("Physicians", physicianSchema);