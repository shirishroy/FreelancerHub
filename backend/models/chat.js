const { Schema, default: mongoose } = require("mongoose");

const chatSchema = new Schema({
    userId : {
        type: [Schema.Types.ObjectId],
        required: true,
        ref : 'User'
    },
    name : {
        type : String,
        required : false
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.export = Chat;