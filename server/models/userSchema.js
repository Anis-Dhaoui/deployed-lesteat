const mongoose = require('mongoose'); 
const PassportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

userSchema.plugin(PassportLocalMongoose);

//Export the model
module.exports = mongoose.model('User', userSchema);