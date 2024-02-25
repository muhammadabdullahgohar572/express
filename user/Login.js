const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
});

const LoginModel = mongoose.model("UserLogin", LoginSchema); // Use "UserLogin" as the model name

module.exports = LoginModel;
