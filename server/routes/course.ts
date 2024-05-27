import express from "express";
import { uploadCourse } from "../controllers/course";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post('/upload-course', verifyToken, uploadCourse)

export default router