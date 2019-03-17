var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  password: String
});

UserSchema.authenticate = (username, password) => {  
	return new Promise((resolve, reject) => {
	  db.findOne({username, password}, (err, data) => {
		if (err) return reject(err);
		resolve(data); 
	  });
	});
  };
  
var User = mongoose.model("User", UserSchema);
module.exports = User;
