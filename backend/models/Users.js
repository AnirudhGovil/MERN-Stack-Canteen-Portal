const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	contactNumber: {
		type: Number,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		required: true,
		default: 0
	}

});

// Create Schema
const VendorSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	contactNumber: {
		type: Number,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
	timings: {
		type: String,
		required: true
	},
	orders: {
		type: Number,
		required: true,
		default: 0
	}
});

// Create Schema
const FoodItemsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	rating: {
		type: Number,
		required: false,
		default: 0
	},
	nonveg: {
		type: Boolean,
		required: true,
		default: 0
	},
	tags: {
		type: [String],
		required: false
	},
	addOns: {
		type: [Object],
		required: false
	}
});


module.exports = {
	User: mongoose.model("Users", UserSchema),
	Vendor: mongoose.model("Vendors", VendorSchema),
	FoodItems: mongoose.model("FoodItems", FoodItemsSchema)
};
