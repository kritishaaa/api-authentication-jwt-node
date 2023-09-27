const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Name is required'],
        min: 6,
        max: 265

    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type : String ,
        required : [true,"Password is Required"],
        minlength :[8],
        maxlength :10,
    },
    date:{
        type:Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('User', userSchema);