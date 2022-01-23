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

/* router.get("/profile", (req, res) => {
    // Find user by email
    User.findOne({ email: localStorage.getItem('currentUser') }, function (err, data) {
        console.log(data);
    });
}); */
router.post("/profilechange", (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    User.findOne({ email: email }).then(user => {
        // Check if user email exists
        if (user) {

            const token = user;
            res.status(200).json({
                token: token
            });
            res.send({ message: "profile sucess", user: user })
            res.redirect('/')

        }
    });
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
                const token = user.email;
                res.status(200).json({
                    token: token
                });
                res.send({ message: "login sucess", user: user })
                res.redirect('/')
            }
        }
    });

    Vendor.findOne({ email: email }).then(vendor => {
        // Check if user email exists
        if (vendor) {
            if (password === vendor.password) {
                const token = vendor.email;
                res.status(200).json({
                    token: token
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
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        shop: req.body.shop,
        price: req.body.price,
        rating: 0,
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

