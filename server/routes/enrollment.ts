import express from "express";
import { verifyToken } from "../middleware/auth";
import { createEnrollment, getEnrollment } from "../controllers/enrollment";

const router = express.Router();

router.post('/create-enrollment', verifyToken, createEnrollment)
router.get('/get-enrollment/:courseId', verifyToken, getEnrollment)

export default router