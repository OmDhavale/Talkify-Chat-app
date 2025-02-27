// import { Server } from 'socket.io'
const { Server } = require('socket.io')
const http = require('http')
const express = require("express");

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["https://talkify-chat-y98m.onrender.com"],//frontend website
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverID)=>{
    return userSocketMap[receiverID]
}
const userSocketMap = {}

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id)

    const userId = socket.handshake.query.userId

    if(userId != "undefined"){
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        console.log("A User disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

module.exports = { app, io, server, getReceiverSocketId };