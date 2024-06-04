import { Request, Response } from "express";
import { db } from "../db/db";
import { CourseValidator } from "../../shared/validators/course";
import { Course, Prisma } from "@prisma/client";
import { getMonth } from "date-fns";

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

        const { title, description, tags, media, price, thumbnail } = CourseValidator.parse(body);

        if(!media || typeof media !== 'string' || media.trim() === '') {
            return res.status(400).json({success: false, error: "Bad Request", message: "Course video not provided"})
        }
        if(!thumbnail || typeof thumbnail !== 'string' || thumbnail.trim() === '') {
            return res.status(400).json({success: false, error: "Bad Request", message: "Course thumbnail not provided"})
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
                thumbnail,
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
        const query = req.query;
        const page = Number(query.page) || 1
        

        const where: Prisma.CourseWhereInput = {
            
        }


        if (query.userId && typeof query.userId === 'string') {
            where.authorId = query.userId;
        }

        if(query.tags && typeof query.tags === 'string') {
            let tags: string[] = query?.tags?.split(',')

            if (tags.length > 0) {
                if (!where.AND) {
                    where.AND = [];
                }
                (where.AND as Prisma.CourseWhereInput[]).push({
                    tags: {
                        hasSome: tags
                    }
                });
        }
    }

    if (query.q && typeof query.q === 'string') {
        if (!where.AND) {
            where.AND = [];
        }
        (where.AND as Prisma.CourseWhereInput[]).push({
            title: {
                contains: query.q,
                mode: 'insensitive'
            }
        });
    }

    const coursesNum = await db.course.aggregate({
        _count: true
    })

    const pageSize = Number(query.pageSize) || coursesNum._count

        const courses = await db.course.findMany({
            where: where,
            select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
                description: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        specialization: true,
                    }
                }
            },
            take: pageSize,
            skip: (page - 1) * pageSize

        })

        const pages = Math.ceil(coursesNum._count / pageSize)

        const coursesWithAverageRating = await Promise.all(courses.map(async course => {
            const avgRating = await db.rating.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    courseId: course.id
                }
            });
        
            const averageRating = avgRating._avg.rating || 0;
        
            return {
                ...course,
                averageRating: averageRating
            };
        }));



        return res.status(200).json({success: true, courses: coursesWithAverageRating, pages})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false})
    }
}

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params
        
        const course = await db.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                id: true,
                price: true,
                description: true,
                title: true,
                thumbnail: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        specialization: true,
                        description: true,
                        profile_picture: true
                    }
                }
            }
        })

        const averageRating = await db.rating.aggregate({
            _avg: {
                rating: true
            },
            where: {
                courseId: course?.id
            }
        })

        return res.status(200).json({ success: true, course: {...course, averageRating: averageRating._avg.rating}})
    } catch (error) {
        return res.status(500).json({ success: false})
    }
}

export const getFeaturedCourses = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        
        const mostRecentEnrollments = await db.course.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
                description: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        specialization: true,
                    }
                }
            },
            orderBy: {
                enrollments: {
                    _count: "desc"
                }
            },
            take: 20 ,
            where: {
                enrollments: {
                    every: {
                        createdAt: {
                            gte: thirtyDaysAgo
                        }
                    }
                }
            }
        })

        const trendingCoursesWithAverageRating = await Promise.all(mostRecentEnrollments.map(async course => {
            const avgRating = await db.rating.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    courseId: course.id
                }
            });
        
            const averageRating = avgRating._avg.rating || 0;
        
            return {
                ...course,
                averageRating: averageRating
            };
        }));

        const mostEnrollments = await db.course.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
                description: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        specialization: true,
                    }
                }
            },
            orderBy: {
                enrollments: {
                    _count: "desc"
                }
            },
            take: 20
        })

        const popularCoursesWithAverageRating = await Promise.all(mostEnrollments.map(async course => {
            const avgRating = await db.rating.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    courseId: course.id
                }
            });
        
            const averageRating = avgRating._avg.rating || 0;
        
            return {
                ...course,
                averageRating: averageRating
            };
        }));

        return res.status(200).json({ success: true, mostEnrollments: popularCoursesWithAverageRating, mostRecentEnrollments: trendingCoursesWithAverageRating})      
    } catch (error) {
        return res.status(500).json({ success: false })
    }
}

export const rateCourse = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        
        const { rating } = req.body
        const { courseId } = req.params

        const enrollment = await db.enrollment.findFirst({
            where: {
                studentId: user.id,
                courseId
            }
        })

        if(!enrollment) {
            return res.status(401).json({ success: false, message: "User is not enrolled in this course!"})
        }

        const previousRating = await db.rating.findFirst({
            where: {
                courseId: courseId,
                userId: user.id
            }
        })

        if(previousRating) {
            await db.rating.update({
                where: {
                    id: previousRating.id
                },
                data: {
                    rating
                }
            })
        } else {
            await db.rating.create({
                data: {
                    userId: user.id,
                    courseId,
                    rating
                }
            })
        }

        return res.status(200).json({ success: true})

    } catch (error) {
        return res.status(500).json({ success: false })
    }
}