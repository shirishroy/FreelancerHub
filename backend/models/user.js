const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    // role : {
    //     type : String,
    //     required : true,
    // },
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    clerkId : {
        type : String,
        required : true,
    },
    resumeLink : {
        type : String,
        required : false,
    },
    skills : {
        type : [String],
        required : false,
    },
    image : {
        type : String,
        required : false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;