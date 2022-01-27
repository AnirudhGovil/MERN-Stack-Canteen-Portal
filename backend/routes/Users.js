var express = require("express");
var router = express.Router();
var shopName;
// Load Buyer model
const Buyer = require("../models/Users").Buyer;
const Vendor = require("../models/Users").Vendor;
const FoodItems = require("../models/Users").FoodItems;
const Orders = require("../models/Users").Orders;

// GET request 
// Getting all the users
router.get("/buyers", function (req, res) {
    Buyer.find(function (err, users) {
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
    const shop = req.headers.shop;
    FoodItems.find({shop},function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/getOrders", function (req, res) {
    const shop = req.headers.shop;
    Orders.find({shop},function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/getMyOrders", function (req, res) {
    const Email = req.headers.buyeremail;
    console.log(req)
    Orders.find({buyerEmail : Email},function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.get("/getAllFoodItems", function (req, res) {
    var curr_date = new Date();
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
    Buyer.findOne({ email }).then(user => {
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
    Buyer.findOne({ email }).then(user => {
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
        vendor.timings1 = req.body.timings1;
        vendor.timings2 = req.body.timings2;
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

router.post("/editfood", (req, res) => {
    const name = req.body.name;
    // Find user by email
    FoodItems.findOne({ name }).then(foodItem => {
        // Check if foodItem email exists
        foodItem.price = req.body.price;
        foodItem.nonveg = req.body.nonveg;
        foodItem.tags = req.body.tags;
        foodItem.addOns = req.body.addOns;
        foodItem.save().then(foodItem => {
            res.status(200).json(foodItem);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/deletefood", (req, res) => {
    const name = req.body.name;
    // Find user by email
    FoodItems.findOne({ name }).then(foodItem => {
        // Check if foodItem email exists
        foodItem.remove().then(foodItem => {
            res.status(200).json(foodItem);
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
    const newUser = new Buyer({
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
        timings1: req.body.timings1,
        timings2: req.body.timings2,
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
    Buyer.findOne({ email: email }).then(user => {
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
                    'timings1': vendor.timings1,
                    'timings2': vendor.timings2
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
    const newFood = new FoodItems({
        name: req.body.name,
        shop: req.body.shop,
        price: req.body.price,
        rating: req.body.rating,
        nonveg: req.body.nonveg,
        tags: req.body.tags,
        addOns : req.body.addOns,
    });

    newFood.save()
        .then(food => {
            res.status(200).json(food);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/registerOrder", (req, res) => {
    const newOrder = new Orders({
        itemName: req.body.itemName,
        buyerEmail: req.body.buyerEmail,
        shop: req.body.shop,
        price: req.body.price,
        addOns : req.body.addOns,
        date : req.body.date,
        quantity : req.body.quantity,
        status : req.body.status,
    });

    newOrder.save()
    const email = req.body.buyerEmail;
        // Find user by email
    Buyer.findOne({ email }).then(user => {
            // Check if user email exists
            user.wallet = Number(user.wallet) - req.body.quantity*Number(req.body.price);
            user.save().then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
        })
});

router.post("/editOrder", (req, res) => {
    const buyerEmail = req.body.buyerEmail;
    const date = req.body.date;
    const stat = req.body.status;
    // Find user by email and date
    Orders.findOne({buyerEmail: buyerEmail,date: date}).then(Orders => {
        // Check if Orders email exists
        if(stat.localeCompare("REJECTED")==0)
        {
            Orders.status="REJECTED";
            Buyer.findOne({ email : buyerEmail }).then(user => {
                // Check if user email exists
                user.wallet = Number(user.wallet) + Number(req.body.price);
                user.save()
            })
        }
        else if(Orders.status.localeCompare("PLACED")==0)
        {
            Orders.status="ACCEPTED";
        }
        else if(Orders.status.localeCompare("ACCEPTED")==0)
        {
            Orders.status="COOKING";
        }
        else if(Orders.status.localeCompare("COOKING")==0)
        {
            Orders.status="READY FOR PICKUP";
        }
        else if(Orders.localeCompare("REJECTED")==0)
        {
            Orders.status="REJECTED";
        }
        Orders.save().then(Orders => {
            res.status(200).json(Orders);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/pickOrder", (req, res) => {
    const buyerEmail = req.body.buyerEmail;
    const date = req.body.date;
    // Find user by email and date
    Orders.findOne({buyerEmail: buyerEmail,date: date}).then(Orders => {
        // Check if Orders email exists
        if(Orders.status.localeCompare("READY FOR PICKUP")==0)
        {
            Orders.status="COMPLETED";
        }
        Orders.save().then(Orders => {
            res.status(200).json(Orders);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/rateOrder", (req, res) => {
    const foodItem = req.body.foodItem;
    // Find user by email and date
    FoodItems.findOne({name: foodItem}).then(food => {
        // Check if food email exists
        food.rating.push(req.body.rating)
        food.save().then(food => {
            res.status(200).json(food);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
});

router.post("/completedOrders", (req, res) => {
    const shop = req.body.shop;
    const status = "COMPLETED";
    // Find user by email and date
    Orders.find({shop: shop,status: status}).then(Orders => {
            res.status(200).json(Orders);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })

router.post("/cookingOrders", (req, res) => {
        const shop = req.body.shop;
        const status = "COOKING";
        // Find user by email and date
        Orders.find({shop: shop,status: status}).then(Orders => {
                res.status(200).json(Orders);
            })
            .catch(err => {
                res.status(400).send(err);
            });
        })

router.post("/acceptedOrders", (req, res) => {
        const shop = req.body.shop;
        const status = "ACCEPTED";
            // Find user by email and date
        Orders.find({shop: shop,status: status}).then(Orders => {
                  res.status(200).json(Orders);
               })
              .catch(err => {
                res.status(400).send(err);
            });
       })

    router.post("/currentlyPlacedOrders", (req, res) => {
            const shop = req.body.shop;
            const status = "PLACED";
            // Find user by email and date
            Orders.find({shop: shop,status: status}).then(Orders => {
                    res.status(200).json(Orders);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            })

    router.post("/toBePickedUpOrders", (req, res) => {
        const shop = req.body.shop;
        const status = "READY FOR PICKUP";
        // Find user by email and date
        Orders.find({shop: shop,status: status}).then(Orders => {
                res.status(200).json(Orders);
            })
            .catch(err => {
                res.status(400).send(err);
            });
        })

    router.post("/totalOrders", (req, res) => {
            const shop = req.body.shop;
            // Find user by email and date
            Orders.find({shop}).then(Orders => {
                    res.status(200).json(Orders);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            })




module.exports = router;

