import { Course } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import CourseCard from "./CourseCard"
import { cn } from "@/lib/utils"


interface AuthorInfoProps {
    authorId: string
    className?: string
    pageSize?: number
}

const MoreFromAuthor = ({authorId, className, pageSize}: AuthorInfoProps) => {
    const [courses, setCourses] = useState<Course[] >([])

    const getAuthorPosts = async () => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/get-courses?userId=${authorId}&pageSize=${pageSize || 3}`)

        setCourses(response.data.courses)
    }

    useEffect(() => {
        getAuthorPosts()
    }, [])

    return (
        <div className={cn("w-full flex-1 grid gap-2", className)}>
            {courses?.map((item) => (
                <CourseCard {...item} key={item.id} />
            ))}
        </div>
    )
}

export default MoreFromAuthor