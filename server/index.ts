import dotenv from "dotenv"
import express, { Request, Response } from 'express';
import cors from "cors"

import authRouter from "./routes/auth"
import courseRouter from "./routes/course"

const app = express()

const PORT = process.env.PORT || 3200

app.use(cors({
  origin: "*"
}))

app.use(express.json())

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/course', courseRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))