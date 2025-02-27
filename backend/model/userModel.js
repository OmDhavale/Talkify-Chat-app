const mongoose = require("mongoose")
const userModel = new mongoose.Schema({
    name: {type:String , require:true},
    email:{type:String, unique: true, required: true},
    password:{type: String, required: true},
    //picture: {type:String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
},{timestamps: true})

module.exports = mongoose.model("User",userModel)