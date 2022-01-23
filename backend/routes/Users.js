var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users").User;
const Vendor = require("../models/Users").Vendor;
const FoodItems = require("../models/Users").FoodItems;

// GET request 
// Getting all the users
router.get("/buyers", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/vendors", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/getFoodItems", function (req, res) {
    FoodItems.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/wallet", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        user.wallet = Number(user.wallet) + Number(req.body.wallet);
        user.save().then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/userprofile", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        user.name = req.body.name;
        user.contactNumber = req.body.contactNumber;
        user.age = req.body.age;
        user.batch = req.body.batch;
        user.password = req.body.password;
        user.wallet = req.body.wallet;
        user.save().then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/vendorprofile", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        // Check if vendor email exists
        vendor.name = req.body.name;
        vendor.contactNumber = req.body.contactNumber;
        vendor.shop = req.body.shop;
        vendor.timings = req.body.timings;
        vendor.password = req.body.password;
        vendor.orders = req.body.orders;
        vendor.save().then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        age: req.body.age,
        batch: req.body.batch,
        wallet: req.body.wallet
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/register2", (req, res) => {
    const newVendor = new Vendor({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        shop: req.body.shop,
        timings: req.body.timings,
        orders: req.body.orders
    });

    newVendor.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    User.findOne({ email: email }).then(user => {
        // Check if user email exists
        if (user) {
            if (password === user.password) {
                res.status(200).json({
                    'email': user.email,
                    'password': user.password,
                    'name': user.name,
                    'contactNumber': user.contactNumber,
                    'age': user.age,
                    'batch': user.batch,
                    'wallet':user.wallet
                });
                res.send({ message: "login sucess", user: user })
                res.redirect('/')
            }
        }


        else {
            return res.status(404).json({
                error: "Email not found",
            });
        }
    });
});

router.post("/login2", (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    Vendor.findOne({ email: email }).then(vendor => {
        // Check if user email exists
        if (vendor) {
            if (password === vendor.password) {
                res.status(200).json({
                    'email': vendor.email,
                    'password': vendor.password,
                    'name': vendor.name,
                    'contactNumber': vendor.contactNumber,
                    'shop': vendor.shop,
                    'timings': vendor.timings
                });
                res.send({ message: "login sucess", vendor: vendor })
                res.redirect('/')
            }
        }

        else {
            return res.status(404).json({
                error: "Email not found",
            });
        }
    });
});


router.post("/registerFood", (req, res) => {
    const newUser = new FoodItems({
        email: req.body.email,
        name: req.body.name,
        shop: req.body.shop,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        nonveg: req.body.nonveg,
        tag: req.body.tag
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;

