import { Request, Response } from "express";
import { db } from "../db/db";
import { CourseValidator } from "../../shared/validators/course";


export const uploadCourse = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const user = await db.user.findFirst({
            where: {
                id: res.locals.user.id
            }
        })

        if(!user || user.role !== 'TUTOR') {
            return res.status(401).json({success: false, error: "Unauthorized", message: "No user or user is not a tutor!"})
        }

        const { title, description, tags, media, price } = CourseValidator.parse(body);

        if(!media || typeof media !== 'string' || media.trim() === '') {
            return res.status(400).json({success: false, error: "Bad Request", message: "Course video not provided"})
        }

        console.log("body: ", body)
        console.log("user: ", res.locals.user)

        const course = await db.course.create({
            data: {
                title,
                description,
                price,
                tags,
                media,
                authorId: user.id
            }
        })

        return res.status(200).json({ success: true, courseId: course.id })
    } catch (error) {
        console.error('Error uploading course:', error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: 'An unexpected error occurred'
        });
    }
}