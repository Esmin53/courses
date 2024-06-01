import express from "express";
import { verifyToken } from "../middleware/auth";
import { getUserProfile } from "../controllers/user";

const router = express.Router();

router.get('/get-user/:id', getUserProfile)

export default router