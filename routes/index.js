var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user")

router.get("/",(req,res)=>{
	res.render("landing");
});

//Auth Routes

//REGISTER

router.get("/register",isNotLoggedIn,(req,res)=>{
	res.render("register");
});

router.post("/register",(req,res)=>{
	var newUser = new User({ username : req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/alumni");
		});
	});
});

//Login

router.get("/login",isNotLoggedIn,(req,res)=>{
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/alumni",
		failureRedirect: "/login"
	}), function(req,res){
});

//logout

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/alumni");
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function isNotLoggedIn(req,res,next){
	if(!req.isAuthenticated()){
		return next();
	}
	res.redirect("/alumni");
}

module.exports = router;