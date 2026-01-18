
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email :{
        type: String,
        required: true
    }
});


// for mongoose automatically enter username or password and hashing salting ect
userSchema.plugin(passportLocalMongoose);


module.exports= mongoose.model('User', userSchema);