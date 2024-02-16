import express from "express";
import dotenv from "dotenv"
import userRouter from './router/auth.router.js'
import userUpdateRouter from './router/user.router.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import listingrouter from "./router/listingRoute.js"

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connect mongodb ...")
}).catch((err) => {
    console.log(err)
})


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRouter)
app.use('/api/user',userUpdateRouter)
app.use('/api/listing',listingrouter)

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || 'Internal servar error '

    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})

app.listen(3000, () => {
    console.log("servar is runing on 3000....")
})