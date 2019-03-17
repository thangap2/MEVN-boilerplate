var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  first_name: String,
  last_name: String,
  age: Number,
  address: String,
  city: String,
  state: String,
  zipcode: String
});

var Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
