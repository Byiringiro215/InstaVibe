import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import usersRoutes from './routes/users.routes.js'

import connectToMongoDB from './db/connectToMOngoDb.js';
import cookieParser from 'cookie-parser';
import { app, server } from './Socket/socket.js'

const PORT=process.env.PORT || 5000;

dotenv.config();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",usersRoutes);

app.get("/",(req,res)=>{
    res.send("Hello! guyz This is My Chat App Project");
})


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});