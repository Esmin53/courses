import { Course } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import CoursesCarousel from "./CoursesCarousel"


const Featured = () => {
    const [mostEnrollments, setMostEnrollments] = useState<Course[]>([])
    const [mostRecentEnrollments, setMostRecentEnrollments] = useState<Course[]>([])

    const getFeaturedData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/featured-data`)

            setMostEnrollments(response.data.mostEnrollments)
            setMostRecentEnrollments(response.data.mostRecentEnrollments)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getFeaturedData()
    }, [])

    return (
        <div className="w-full flex flex-col gap-8 py-6">
            <div className="w-full">
                <h1 className="text-2xl xs:text-3xl font-bold text-gray-800">Whats trending</h1>
                <p className="text-lg xs:text-xl my-2 xs:my-4">See what other students are learning the most in the past 30 days</p>
                <CoursesCarousel coursesArray={mostRecentEnrollments}/>
            </div>
            <div className="w-full">
                <h1 className="text-2xl xs:text-3xl font-bold text-gray-800">Best selling courses</h1>
                <p className="text-lg xs:text-xl my-2 xs:my-4">Browse through our all time most popular courses</p>
                <CoursesCarousel coursesArray={mostEnrollments}/>
            </div>
        </div>
    )
}

export default Featured