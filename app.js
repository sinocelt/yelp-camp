var express = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");
    // User        = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp_v5");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
// console.log(__dirname);
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE route - add new campground to the database 
app.post("/campgrounds", function(req, res) {
    //res.send("you hit the post route");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW route - show form to create a campground
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
             res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// =============================
// COMMENTS ROUTES
// =============================

//NEW       /campgrounds/:id/comments/new   GET form for new comment for one camp
app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campground by id and then send that through when we render
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE
app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           res.redirect("/campgrounds");
       }  else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelpcamp server has started");
});