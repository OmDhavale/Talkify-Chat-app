const mongoose = require("mongoose")
const chatModel = mongoose.Schema({
    // chatName: {type: String, trim: true},
    // isGroupChat: {type: Boolean, default: false},
    // users: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }],
    // latestMessage: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Message"
    // },
    // groupAdmin:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
    participants:[
        {type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default:[]
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("Chat",chatModel)