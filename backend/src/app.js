import express from "express"
import cors from 'cors'
import cookieParser  from "cookie-parser"

const app = express()

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

import userRouter from '../src/routes/user.route.js'


app.use('/api/v1/users', userRouter)






export { app }


