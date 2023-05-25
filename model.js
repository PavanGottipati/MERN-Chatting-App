const mongoose = require('mongoose');

const Registeruser = new mongoose.Schema({
    username:{
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
         type:String,
         required:true
    }
});

const Task = mongoose.model('Registeruser',Registeruser);
module.exports = Task;