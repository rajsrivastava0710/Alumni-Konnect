var express                =require("express"),
    bodyParser             =require("body-parser"),
    mongoose               =require("mongoose"),
    methodOverride         =require("method-override"),
    cookieParser           =require("cookie-parser"),
    session                =require("express-session"),
 	passport               =require("passport"),
    LocalStrategy          =require("passport-local"),
    passportlocalmongoose  =require("passport-local-mongoose"),
    Alumni                 =require("./models/alumni"),
    User                   =require("./models/user")
    app                    =express();

//Requiring routes
var alumniRoutes    = require("./routes/alumni");
var indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://localhost/knitkonnect",{useNewUrlParser:true});

app.set("view engine","ejs");
// app.use( bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser('secret'));

//Passport Auth:

app.use(require("express-session")({
    secret:"secret",
    resave: false ,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

//middleware and the fn provided will be called for every route
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
//whatever in res.locals is whats available in our template


app.use("/alumni" , alumniRoutes);
app.use("/",indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port,() => console.log("The server has started at port "+port));