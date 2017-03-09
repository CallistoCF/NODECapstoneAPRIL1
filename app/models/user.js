// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    inapp            :{
        day1         :{
          type: Boolean,
          default: true},
        day2         :{
          type: Boolean,
          default: true},
        day3         :{
          type: Boolean,
          default: true},
        day4         :{
          type: Boolean,
          default: true},
        day5         :{
          type: Boolean,
          default: true},
        day6         :{
          type: Boolean,
          default: true},
        day7         :{
          type: Boolean,
          default: true},
        done         :{
          type: Boolean,
          default: true},
    },
    datedata         :{
        joindate     : {type: Date, default: Date.now()},
        lastlogin    : Date,
    },
    notes            :{
        addin        : String,
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
