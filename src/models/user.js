const mongoose = require('mongoose')


var userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true
        },
        email : {
            type: String,
            required : [true, "Email is mandatory field"],
            unique : [true, "Email id already exists"]
        },
        password : {
            type : String,
            required : true
        },
        role: {
            type : String,
            enum : ['admin', 'user'],
            required : true
        }
    }
);

module.exports = mongoose.model('User', userSchema);