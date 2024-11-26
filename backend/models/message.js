const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
    message : {
        type: String,
        required : true
    },
    chatId : {
        type: Schema.Types.ObjectId,
        ref : 'Chat',
        required: true,
    },
    timestamp : {
        type : Date,
        default : Date.now,
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports= Message;