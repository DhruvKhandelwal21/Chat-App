const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const msgRoute = require("./routes/msgRoute");
const socket = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",msgRoute);
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("db is connected successfully");
}).catch((e)=> {
    console.log(e.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
global.onlineUsers = new Map();
io.on("connection",(socket)=> {
    global.chatSocket = socket;
    console.log("connected to socket");
   socket.on("add-new-user",(userid)=>{
       onlineUsers.set(userid,socket.id);
  });
  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieved",data.message);
    }
});
});


