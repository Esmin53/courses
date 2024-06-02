import { Request, Response } from "express"
import { db } from "../db/db"


export const createEnrollment = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user

        const { courseId } = req.body

        const enrollment = await db.enrollment.create({
            data: {
                studentId: user.id,
                courseId: courseId
            }
        })

        return res.status(200).json({ success: true, enrollment })

    } catch (error) {
        return res.status(500).json({ success: false})
    }
}

export const getEnrollment = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const { id } = res.locals.user

        const { courseId } = req.params;

        const enrollment = await db.enrollment.findFirst({
            where: {
                courseId: courseId,
                studentId: id
            },
            select: {
                course: {
                    select: {
                        media: true,
                        title: true,
                        author: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        if(!enrollment) {
            return res.status(200).json({success: false, enrollment: null, isEnrolled: false})
        }

        return res.status(200).json({ success: true, enrollment: enrollment.course, isEnrolled: true})
    } catch (error) {
        console.log(error)
        return res.status(200).json({ success: false })
    }
}

export const getEnrollments = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;

        const enrollments = await db.enrollment.findMany({
            where: {
                studentId: user.id
            },
            select: {
                id: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                        price: true,
                        author: {
                            select: {
                                id: true,
                                username: true
                            }

                        }
                    }
                },
            }
        })

        return res.status(200).json({ success: true, enrollments})
        
    } catch (error) {
        
    }
}