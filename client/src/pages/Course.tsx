import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"  
import { Toaster, toast } from "sonner";


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
    const [isEnrolled, setIsEnrolled] = useState<boolean >(false)

    const location = useLocation()
    const courseId = location.pathname.split('/')[2]
    const navigate = useNavigate()

    const { currentUser } = useAuthStore()

    const getCourse = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/get-course/${courseId}`)

            setCourse(response.data.course)
        } catch (error) {
            console.log(error)
        }
    }

    const getEnrollment = async () => {
        if(!currentUser) {
            return
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enrollment/get-enrollment/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })
    
            setIsEnrolled(response.data.isEnrolled)

        } catch (error) {
            
        }
    }

    const enroll = async () => {
        try {
            if(!currentUser) {
                navigate(`/login?src=course/${courseId}`)
                return
            }
            if(currentUser?.user.id === course?.author.id) {
                toast.error("You are the author of this course!")
                return
            }

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/enrollment/create-enrollment`, {courseId: course?.id}, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })
            
            if(response.status === 200 && response.data.success === true) {
                navigate(`/enrollment/${course?.id}`)
            }

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCourse()
        getEnrollment()
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
                {isEnrolled ? (
                    <a className="w-full h-12 bg-primary-purple text-white font-medium rounded-md shadow hover:bg-primary-purple/90 duration-200
                    flex items-center justify-center"
                    href={`/enrollment/${courseId}`}>Take me to course</a>                    
                ) : <AlertDialog>
                <AlertDialogTrigger className="w-full h-12 bg-primary-purple text-white font-medium rounded-md shadow hover:bg-primary-purple/90 duration-200"
                onClick={() => !currentUser && navigate(`/login?src=course/${courseId}`)}>Buy now</AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Are you absolutely sure you want to parchuse this course?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => enroll()} className="bg-primary-purple text-white">Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>}
                <div className="w-full flex flex-col mt-8 gap-2 px-4">
                    <div className="w-1/2 aspect-square bg-emerald-300 mx-auto">
                    </div>
                    <a href={`/profile/${course?.author.id}`} className="text-xl text-gray-800 font-medium mx-auto">{course?.author.username}</a>
                    <p className="text-sm font-medium text-gray-600 mx-auto">{course?.author.specialization}</p>
                    <p>{course?.author.description}</p>
                </div>
            </div>
        </div>
        <Toaster position="top-center" richColors/>
    </div>
    )
};

export default Course;