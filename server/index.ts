import dotenv from "dotenv"
import express, { Request, Response } from 'express';
import cors from "cors"

import authRouter from "./routes/auth"
import courseRouter from "./routes/course"
import userRouter from "./routes/user"
import enrollmentRouter from "./routes/enrollment"

const app = express()

const PORT = process.env.PORT || 3200

app.use(cors({
  origin: "*"
}))

app.use(express.json())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/enrollment', enrollmentRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))