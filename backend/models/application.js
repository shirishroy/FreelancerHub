const { Schema, default: mongoose } = require("mongoose");

const applicationSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref : 'Project',
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    assignment: {
        type : Schema.Types.ObjectId,
        ref : 'Assignment',
        required: false,
    }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;