var express=require("express");
var router = express.Router();
var Alumni =require("../models/alumni");

router.get("/",(req,res)=>{
	res.render("Alumni/alumni");
});

router.get("/new",isLoggedIn,(req,res)=>{
	res.render("Alumni/new",{user: req.user.username});
});

router.post("/",(req,res)=>{
	Alumni.create(req.body.blog,function(err,newAlumni){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/alumni");
		}
	});
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;