import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//
import 'dotenv/config'
import cookieParser from "cookie-parser";
//

import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import userRoute from "./routes/users.js";
import roomRouter from "./routes/rooms.js"
//
const app = express();
const PORT = process.env.PORT || 9090

// 



// connectDB
const ConnectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB)
    console.log(`Connected to DB success...`)
    console.log(`At the port: http://localhost:${PORT}`)
  } catch (err) { 
    console.log(err)
  }
}


//
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!")
})

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!")
})

// middlewares APi
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelRoute)
app.use("/api/users", userRoute)
app.use("/api/rooms", roomRouter)


// midleware
app.use((err, req, res, next ) => { 
  const errStatus = err.status || 500
  const errMessage = err.message || "St wen wrong"
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  })
})



app.listen(PORT, () => {
 ConnectedDB()
})