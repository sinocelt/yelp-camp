var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's rest", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Biskeri-_Camping_I_IMG_7238.jpg/320px-Biskeri-_Camping_I_IMG_7238.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },     
    {
        name: "Big campground", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/GVBR_Tent_City_at_Anglesea_Pano%2C_Vic%2C_jjron%2C_09%2C_04.12.2009.jpg/320px-GVBR_Tent_City_at_Anglesea_Pano%2C_Vic%2C_jjron%2C_09%2C_04.12.2009.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {
        name: "Car Camping", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Car_Camping.jpg/320px-Car_Camping.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB() {
    //below will remove everything from the database
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        data.forEach(function(seed) {
            //create new campgrounds
            Campground.create(seed, function(err, campground) {
                if(err) {
                 console.log(err);
                } else {
                    console.log("Added a campground");
                    //create new comments
                    Comment.create(
                    {
                        text: "this place is great, but I wish there was internet",
                        author: "Homer"
                            
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment._id);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
