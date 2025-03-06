
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import usersRoutes from './routes/users.routes.js'

import connectToMongoDB from './db/connectToMOngoDb.js';
import cookieParser from 'cookie-parser';

const app=express();
const PORT=process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",usersRoutes);

app.get("/",(req,res)=>{
    res.send("Hello! guyz");
})



app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});