const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
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
	timings1: {
		type: Number,
		required: true
	},
	timings2: {
		type: Number,
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
		type: [Number],
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
	},
});

// Create Schema
const OrdersSchema = new Schema({
	itemName: {
		type: String,
		required: true
	},
	buyerEmail: {
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
	addOns: {
		type: [Object],
		required: false
	},
	date:{
		type: Date,
		required: true
	},
	quantity:{
		type: Number,
		required: true
	},
	status:{
		type: String,
		required: true
	},
});

module.exports = {
	Buyer: mongoose.model("Buyers", BuyerSchema),
	Vendor: mongoose.model("Vendors", VendorSchema),
	FoodItems: mongoose.model("FoodItems", FoodItemsSchema),
	Orders: mongoose.model("Orders", OrdersSchema)
};
