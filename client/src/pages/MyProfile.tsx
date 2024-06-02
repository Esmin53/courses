import CoursesCarousel from "@/components/CoursesCarousel"
import Enrollments from "@/components/Enrollments"
import Wrapper from "@/components/Wrapper"
import { uploadImage } from "@/lib/utils"
import { useAuthStore } from "@/store/useAuthStore"
import { Course, User } from "@/types"
import axios from "axios"
import { Camera, Check, Loader, User2Icon, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


const MyProfile = () => {

    const [user, setUser] = useState<User | null>()
    const [profilePicture, setProfilePicture] = useState<File | null>()
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    
    const { currentUser } = useAuthStore()


    const navigate = useNavigate()

    const pfpInputRef = useRef<HTMLInputElement>(null)

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-user/${currentUser?.user.id}`)

            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const getCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/get-courses?userId=${currentUser?.user.id}`)

            setCourses(response.data.courses)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadProfilePicture = async () => {
        if(!profilePicture) {
            return
        }
        setIsUploading(true)
        try {
            const downloadUrl = await uploadImage(profilePicture, 'profilePictures')

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/upload-profile-picture`, {
                profilePicture: downloadUrl
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            if (response.status === 200) {
                setUser(prevUser => prevUser ? { ...prevUser, profile_picture: downloadUrl } : null);
                setProfilePicture(null)
                setIsUploading(false)
            }
            setIsUploading(false)
        } catch (error) {
            console.log(error)
            setIsUploading(false)
        }
    }

    useEffect(() => {
        if(!currentUser?.user) {
            navigate('/')
        } 

        getUser()
        getCourses()
    }, [])

    useEffect(() => {
        if(profilePicture) {
            let url = URL.createObjectURL(profilePicture)
            setProfilePicturePreview(url)
        } else {
            setProfilePicturePreview(null)
        }
    }, [profilePicture])

    return (
        <Wrapper>
            <div className="w-full max-w-8xl flex-1 flex flex-col gap-6">
                <div className="w-full flex gap-6">
                    <div className="w-52 h-52 bg-slate-100 shadow border border-slate-200 relative">
                        { profilePicture ? <div className="absolute top-0 right-0 z-40 cursor-pointer" onClick={() => setProfilePicture(null)}>
                            <X className="text-red-600"/>
                        </div> : null}
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <User2Icon className="w-32 h-32 text-slate-400"/>
                        </div>
                        {profilePicturePreview ? <img src={profilePicturePreview} className="absolute w-full h-full object-cover object-center z-20"/> : null}
                        {user?.profile_picture? <img src={user.profile_picture} className="absolute w-full h-full object-cover object-center z-10"/> : null}
                        {profilePicture ? <div className="-right-2.5 -bottom-2.5 absolute rounded-full bg-slate-100 w-9 h-9 flex items-center justify-center 
                        shadow-s border border-slate-200 cursor-pointer text-gray-800 z-30" onClick={() => !isUploading && uploadProfilePicture()}>
                            {isUploading ? <Loader className="animate-spin" /> : <Check />}
                        </div> : 
                        <div className="-right-2.5 -bottom-2.5 absolute rounded-full bg-slate-100 w-9 h-9 flex items-center justify-center 
                        shadow-s border border-slate-200 cursor-pointer text-gray-800 z-30" onClick={() => pfpInputRef.current && pfpInputRef.current.click()}>
                            <Camera />
                        </div>}
                        <input type="file" ref={pfpInputRef} multiple={false} className="hidden" 
                        onChange={(e) => e.target.files?.length && setProfilePicture(e.target.files[0])}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="text-3xl font-medium">{user?.username}</h1>
                        <h2 className="text-xl py-2">{user?.specialization}</h2>
                        <div className="w-full border border-gray-400 shadow-sm mb-4" />
                        <p>{user?.description}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-3xl font-medium text-gray-800">My courses</h1>
                    <CoursesCarousel coursesArray={courses} />
                </div>
                <Enrollments />
            </div>
        </Wrapper>
    )
}

export default MyProfile