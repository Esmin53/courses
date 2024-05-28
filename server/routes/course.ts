import express from "express";
import { getCourse, getCourses, uploadCourse } from "../controllers/course";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post('/upload-course', verifyToken, uploadCourse)
router.get('/get-courses', getCourses)
router.get('/get-course/:courseId', getCourse)

export default router