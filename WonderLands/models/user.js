const mongoose = require("mongoose");
const {Schema} = mongoose;
// we are using passport local mongoose as a plugin
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email: {
        type : String,
        required : true
    }
})
// By using passportLocalMongoose as a plugin on your userSchema, it adds fields like username, password, and handles hashing and salting of passwords for you. This simplifies the process of also some methods added check in docs of passport
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);