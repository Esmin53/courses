import CourseCard from "@/components/CourseCard"
import Navbar from "@/components/Navbar"
import Wrapper from "@/components/Wrapper"
import { useAuthStore } from "@/store/useAuthStore"
import { Course, User } from "@/types"
import axios from "axios"
import { User2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Profile = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [user, setUser] = useState<User >()
    
    const { currentUser } = useAuthStore()
    const navigate = useNavigate()

    const location = useLocation()
    const userId = location.pathname.split('/')[2]

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-user/${userId}`)

            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const getCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/get-courses?userId=${userId}`)

            setCourses(response.data.courses)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getCourses()
        getUser()
    }, [])
    
    return (
        <Wrapper>
            <div className="flex flex-col justify-center items-center p-2 flex-1">
            <div className="flex-1 w-full max-w-8xl justify-self-center">
                <div className="flex w-full gap-6">
                <div className="w-52 h-52 bg-slate-100 shadow border border-slate-200 relative">

                        <div className="absolute w-full h-full flex items-center justify-center">
                            <User2Icon className="w-32 h-32 text-slate-400"/>
                        </div>
                        {user?.profile_picture? <img src={user.profile_picture} className="absolute w-full h-full z-10"/> : null}
 
                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="text-3xl font-medium">{user?.username}</h1>
                        <h2 className="text-xl py-2">{user?.specialization}</h2>
                        <div className="w-full border border-gray-400 shadow-sm mb-4" />
                        <p>{user?.description}</p>
                    </div>
                </div>
                <div className="w-full mt-6">
                    <div className="flex justify-between w-full">
                        <div>
                            <h1 className="text-xl font-semibold">My Courses</h1>
                            <p className="text-lg font-medium">All courses by {user?.username}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 py-4">
                        {courses.map((course) => (
                            <CourseCard {...course} key={course.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </Wrapper>
    )
}

export default Profile