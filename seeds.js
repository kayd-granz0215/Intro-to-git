var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   =  require("./models/comment");

var data = [
    {
        name: "Batman",
        image: "https://static.gamespot.com/uploads/screen_kubrick/104/1049837/2891179-batman-arkham_knight-review_nologo_20150618.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name: "Robin",
        image: "https://pmctvline2.files.wordpress.com/2017/12/titans-robin-first-look.jpg?w=640",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    },
    {
        name: "Alfred Pennyworth",
        image: "https://static.comicvine.com/uploads/scale_medium/11116/111164052/4510107-8948033835-alfre.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("removed campgrounds!");
        
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("added a campground");
                Comment.create(
                    {
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
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