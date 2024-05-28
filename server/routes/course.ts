import express from "express";
import { getCourses, uploadCourse } from "../controllers/course";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post('/upload-course', verifyToken, uploadCourse)
router.get('/get-courses', getCourses)

export default router