var mongoose=require("mongoose");
var alumniSchema = new mongoose.Schema({
	name:String,
	image:String,
	roll:String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	Skills: String,
	branch :String,
	mobile :Number,
	linkedin:String,
	github :String,
	facebook: String,
});
 
module.exports= mongoose.model("Alumni",alumniSchema);
