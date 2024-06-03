import Wrapper from "@/components/Wrapper"
import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


const Enrollment = () => {

    const location = useLocation()
    const courseId = location.pathname.split('/')[2]

    const { currentUser } = useAuthStore()

    const [media, setMedia] = useState<{
            media: string,
            title: string
            author: {
                id: string
                username: string
            }
    }>()

    const getEnrollment = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enrollment/get-enrollment/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            if(response.status === 200) {
                setMedia(response.data.enrollment)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEnrollment()
    }, [])

    return (
        <Wrapper>
            <div className="w-full flex-1 h-full max-w-8xl py-4 gap-2">

            <h1 className="text-xl xs:text-3xl sm:text-4xl text-gray-800 font-bold">{media?.title}</h1>
            <p className="text-lg text-gray-600">By <a href={`/profile/${media?.author.id}`} className="font-medium">{media?.author.username}</a></p>
            <div className="aspect-video max-w-6xl bg-slate-100 shadow border border-slate-200 my-4 relative">
                {media?.media && <video className="w-full h-full absolute top-0 left-0 z-30"  controls>
                    <source src={media?.media} />
                </video>}
            </div>

            </div>
        </Wrapper>
    )
}

export default Enrollment