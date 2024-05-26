import express from "express";
import { uploadCourse } from "../controllers/course";

const router = express.Router();

router.post('/upload-course', uploadCourse)

export default router