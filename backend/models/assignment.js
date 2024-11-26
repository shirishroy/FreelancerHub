const { Schema, default: mongoose } = require("mongoose");

const assignmentSchema = new Schema({
    projectId : {
        type : Schema.Types.ObjectId,
        ref : 'Project',
        required : true,
    },
    assignment : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;