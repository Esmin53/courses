import { Request, Response } from "express";
import { db } from "../db/db";
import { CourseValidator } from "../../shared/validators/course";
import { Course, Prisma } from "@prisma/client";

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

export const getCourses = async (req: Request, res: Response) => {
    try {
        const params = req.query;

        const where: Prisma.CourseWhereInput = {
            
        }


        if(params.tags && typeof params.tags === 'string') {
            let tags: string[] = params?.tags?.split(',')
            where.tags = { hasSome: tags}
        }
        

        console.log(where)

        const courses = await db.course.findMany({
            where: where,
            select: {
                id: true,
                title: true,
                price: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        specialization: true
                    }
                }
            }
        })

        const coursesWithAverageRating = await Promise.all(courses.map(async course => {
            const avgRating = await db.rating.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    courseId: course.id
                }
            });
        
            // Handle the case when there are no ratings for a course
            const averageRating = avgRating._avg.rating || 0;
        
            return {
                ...course,
                averageRating: averageRating
            };
        }));
        
        console.log(coursesWithAverageRating)

        return res.status(200).json({success: true, courses: coursesWithAverageRating})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false})
    }
}