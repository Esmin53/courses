import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { Star, StarHalf, User2Icon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
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
import { Course as CourseType} from "@/types";
import Wrapper from "@/components/Wrapper";
import MoreFromAuthor from "@/components/MoreFromAuthor";


export const Course = () => {
    const [course, setCourse] = useState<CourseType>()
    const [isEnrolled, setIsEnrolled] = useState<boolean >(false)
    const [rating, setRating] = useState<ReactNode[] >([])

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

    useEffect(() => {
        if (course?.averageRating) {
            const stars = [];
            const fullStars = Math.floor(course.averageRating);
            const hasHalfStar = course.averageRating % 1 !== 0;

            for (let i = 0; i < fullStars; i++) {
                stars.push(<Star className="xs:w-8 w-6 xs:h-8 h-6 text-yellow-400" key={i} />);
            }

            if (hasHalfStar) {
                stars.push(<StarHalf className="xs:w-8 w-6 xs:h-8 h-6 text-yellow-400" key={fullStars} />);
            }

            setRating(stars);
        }
    }, [course]);

    return (
        <Wrapper>
        <div className="flex flex-col flex-1 justify-center items-center relative px-2 w-full">

<div className="flex-1 w-full max-w-8xl justify-self-center flex flex-col md:flex-row gap-6 py-4">
    <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div className=" w-full aspect-video bg-slate-100 shadow border border-slate-200 max-h-[30rem] relative">
            <img src={course?.thumbnail} alt="Course Thumbnail" className="absolute w-full h-full left-0 top-0 object-cover"/>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex gap-1">
                {rating.length ?  
                    rating : 
                    <p className=" text-gray-400 sm:text-lg font-medium">No ratings for this course so far</p>}
            </div>
        </div>
    </div>
    <div className="h-full w-full md:w-1/3 flex flex-col gap-4 md:gap-6">
        <h1 className="text-2xl xs:text-3xl font-medium text-gray-800 text-center xs:text-start">{course?.title}</h1>
        <p>{course?.description}</p>
        <p className="text-3xl xs:text-4xl font-bold text-gray-800">$ {course?.price}</p>
        <div className="flex gap-4">

        </div>
        {isEnrolled ? (
            <a className="w-full h-10 xs:h-12 bg-primary-purple text-white font-medium rounded-md shadow hover:bg-primary-purple/90 duration-200
            flex items-center justify-center"
            href={`/enrollment/${courseId}`}>Take me to course</a>                    
        ) : <AlertDialog>
        <AlertDialogTrigger className="w-full h-10 sm:h-12 bg-primary-purple text-white font-medium rounded-md shadow hover:bg-primary-purple/90 duration-200"
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
        <div className="w-full flex flex-col mt-2 sm:mt-8 gap-2 px-4">
            <div className="w-1/2 aspect-square bg-slate-100 shadow border border-slate-200 mx-auto relative">
                <div className="absolute w-full h-full flex items-center justify-center z-10">
                    <User2Icon className="w-32 h-32 text-slate-400 z-10"/>
                </div>
                {course?.author.profile_picture && <img src={course.author.profile_picture} className="w-full h-full z-20 absolute object-cover"/>}
            </div>
            <a href={`/profile/${course?.author.id}`} className="text-xl text-gray-800 font-medium mx-auto">{course?.author.username}</a>
            <p className="text-sm font-medium text-gray-600 mx-auto">{course?.author.specialization}</p>
            <p>{course?.author.description}</p>
        </div>
    </div>
</div>
<Toaster position="top-center" richColors/>
        </div>
        <div className="w-full flex justify-center px-2 xl:px-0">
            <div className="max-w-8xl w-full py-4 flex flex-col gap-4 pb-6 border-t border-gray-300 my-12">
                <h2 className="text-2xl font-medium text-gray-700">More from this author</h2>
                {course?.author ? 
                <MoreFromAuthor authorId={course?.author.id} className=" xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4" pageSize={4} /> : 
                    null}
            </div>

        </div>
        </Wrapper>
    )
};

export default Course;