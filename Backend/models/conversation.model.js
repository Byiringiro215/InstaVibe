import mongoose from "mongoose";
import User from "./user.model.js";
import { type } from "os";


const conversationSchema=new mongoose.Schema({
    partcipants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        },
    ]
},{timestamps:true})


const Conversation=mongoose.model("Conversation",conversationSchema);

export default Conversation;