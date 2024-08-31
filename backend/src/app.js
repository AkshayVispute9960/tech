import express from "express"
import cors from 'cors'
import cookieParser  from "cookie-parser"

const app = express()

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(cookieParser());

app.use(cors());
app.options('*', cors());

import userRouter from '../src/routes/user.route.js'

app.use('/api/v1/users', userRouter)

export { app }


