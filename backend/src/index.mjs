import express from "express";
import authRoutes from "./routes/auth.route.js"; 
import dotenv from "dotenv"
import { connectdb } from "./lib/db.js";
import cookieparser from "cookie-parser";
import messageroutes from "./routes/message.route.js";
import cors from "cors";




dotenv.config();

const port = process.env.port;


const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
    


app.use("/api/auth", authRoutes);
app.use("/api/message", messageroutes);
app.listen(5000, () => {
    console.log("Server is running on the PORT :" + port);
    connectdb();

});
