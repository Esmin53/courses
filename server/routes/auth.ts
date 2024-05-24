import express from "express"
import { becomeTutor, login, register } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/become-a-tutor', verifyToken, becomeTutor)

export default router;

