import dotenv from "dotenv"
import express, { Request, Response } from 'express';
import authRouter from "./routes/auth"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 3200

app.use(cors({
  origin: "*"
}))

app.use(express.json())

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))