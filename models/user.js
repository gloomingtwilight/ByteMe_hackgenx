//schema:properties of the user
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
  
})
  
const userModel=mongoose.model('user',userSchema); //creating a model from the schema creating a new user
module.exports=userModel; //exporting the model to use it in other files