const { Schema, default: mongoose } = require("mongoose");

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    skills : {
        type : [String],
        required : false,
    },
    userId: {
        type : String,
        required : true,
    },
    description: {
        type: String,
        required: true
    },
    file:{
       type: String,
       required: false
    },
    assignment :{
        type: String,
        required: false
    },
    assignmentDesc : {
        type: String,
        required: false
    },
    domain : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    image : {
        type : String,
        required : false,
    }
})
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;