import Navbar from "@/components/Navbar";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const Course = () => {
    const [course, setCourse] = useState<{
        id: string,
                price: number,
                description: string,
                title: string,
                thumbnail: string
                author: {
                    id: string,
                    username: string,
                    specialization: string,
                    description: string
                }
    }>()

    const location = useLocation()
    const courseId = location.pathname.split('/')[2]

    const getCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:3124/api/v1/course/get-course/${courseId}`)

            console.log(response)
            setCourse(response.data.course)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourse()
    }, [])


    return (
        <div className="flex flex-col min-h-screen justify-center items-center relative px-2">
        <Navbar />

        <div className="flex-1 w-full max-w-8xl justify-self-center flex gap-6">
            <div className="w-2/3 flex flex-col gap-4">
                <div className=" w-full aspect-video bg-red-300 max-h-[30rem] relative">
                    <img src={course?.thumbnail} alt="Course Thumbnail" className="absolute w-full h-full left-0 top-0"/>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        <Star className="w-8 h-8 text-yellow-400"/>
                        <Star className="w-8 h-8 text-yellow-400"/>
                        <Star className="w-8 h-8 text-yellow-400"/>
                        <Star className="w-8 h-8 text-yellow-400"/>
                        <Star className="w-8 h-8 text-yellow-400"/>
                    </div>
                    <p className="text-lg text-gray-700">24 enrollments</p>
                </div>
            </div>
            <div className="h-full w-1/3 flex flex-col gap-6">
                <h1 className="text-2xl font-medium text-gray-800">{course?.title}</h1>
                <p>{course?.description}</p>
                <p className="text-4xl font-bold text-gray-800">$ {course?.price}</p>
                <div className="flex gap-4">

                </div>
                <button className="w-full h-12 bg-primary-purple text-white font-medium rounded-md shadow hover:bg-primary-purple/90 duration-200">
                    Buy now
                </button>

                <div className="w-full flex flex-col mt-8 gap-2 px-4">
                    <div className="w-1/2 aspect-square bg-emerald-300 mx-auto">
                    </div>
                    <a href={`/profile/${course?.author.id}`} className="text-xl text-gray-800 font-medium mx-auto">{course?.author.username}</a>
                    <p className="text-sm font-medium text-gray-600 mx-auto">{course?.author.specialization}</p>
                    <p>{course?.author.description}</p>
                </div>
            </div>
        </div>

    </div>
    )
};

export default Course;