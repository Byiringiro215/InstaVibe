
import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../Socket/socket.js";
import{io} from "../Socket/socket.js";
 
 export const sendMessage=async (req,res)=>{
   try {
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user?._id;

//check if there is a conversation

let conversation=await Conversation.findOne({
    partcipants:{$all: [senderId,receiverId]},
});
if (!conversation) {
    conversation=await Conversation.create({
        partcipants:[senderId,receiverId]
    });
}
const newMessage=new Message({
    senderId,
    receiverId,
    message,
})
if (newMessage) {
    conversation.messages.push(newMessage._id)
}

// await conversation.save();
// await newMessage.save();
//run in parallel
await Promise.all([conversation.save(),newMessage.save()]);

//SOCKET IO FUNCTIONALITY WILL GO HERE
const receiverSocketId=getReceiverSocketId(receiverId);
if (receiverSocketId) {
    //io.to(<socket_id>).emit() used to emit events to a specific client
    io.to(receiverSocketId).emit("newMessage",newMessage);
}



   res.status(201).json(newMessage) 
   } catch (error) {
    console.log("Error in sendmessage controller",error.message);
    res.status(500).json({error:"Internal server error"})
   }
 }

 export const getMessages=async(req,res)=>{
    console.log("getMessages route hit with ID:", req.params.id);
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            partcipants:{$all:[senderId,userToChatId]},
        }).populate("messages");//not the reference but the actual message

        console.log("Found conversation:", conversation);
if (!conversation) {
  
    return res.status(404).json({error:"Conversation not found"});
   
}

const messages=conversation.messages;
        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in sendmessage controller",error.message);
    res.status(500).json({error:"Internal server error"})
    }
 }