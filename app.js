var express        = require("express"),
    app            = express(),
    bodyparser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash-plus"),
    methodOverride = require("method-override"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user");
    // seedDB         = require("./seeds");
    
var commentRoute     = require("./routes/comments"),
    campgroundRoute  = require("./routes/campgrounds"),
    authRoute        = require("./routes/auth");



mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://kayd_granz:Taiwo123@ds257077.mlab.com:57077/kay_yelpcamp1", 
mongoose.connect(process.env.DATABASEURL, {
     keepAlive: true,
     reconnectTries: Number.MAX_VALUE,
     useMongoClient: true,  
});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())),
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", authRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);


//SERVER CONGFIG
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running the application");
});