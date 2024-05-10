import express from "express"
import { register } from "../controllers/auth";

const router = express.Router()

router.post('/register', register)
router.get('/register', (req, res) => res.send("Hello from routes"))

export default router;

