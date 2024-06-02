import express from "express";
import { verifyToken } from "../middleware/auth";
import { getUserProfile, uploadProfilePicture } from "../controllers/user";

const router = express.Router();

router.get('/get-user/:id', getUserProfile)
router.post('/upload-profile-picture', verifyToken, uploadProfilePicture)

export default router