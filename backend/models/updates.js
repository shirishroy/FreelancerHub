const { Schema, default: mongoose } = require("mongoose");

const updatesSchema = new Schema({
    projectId: {
        type : Schema.Types.ObjectId,
        ref : 'Project',
        required : true,
    },
    update: {
        type : String,
        required : true,
    },
    progress: {
        type : Number,
        required : true,
    },
    clientAcceptance : {
        type : Boolean,
        required : false,
    }
});

const Updates = mongoose.model('Updates', updatesSchema);

module.exports = Updates;