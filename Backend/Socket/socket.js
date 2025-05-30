import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    },
});


export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
    
}

const userSocketMap={};//{userId:socketId}



io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

const userId=socket.handshake.query.userId;
if (userId !="undefined") userSocketMap[userId]=socket.id;

//io.emit() is used to emit events to all connected clients
io.emit("getOnlineUsers",Object.keys(userSocketMap));//emit the online users to all clients

    //socket.on() is used to listen for events from the client and the server too
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        delete userSocketMap[userId];//remove the user from the map when disconnected
        io.emit("getOnlineUsers",Object.keys(userSocketMap));//emit the online users to all clients
    })
})
export {app,io,server};