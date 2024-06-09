import MoreFromAuthor from "@/components/MoreFromAuthor"
import Wrapper from "@/components/Wrapper"
import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Toaster, toast } from "sonner"


const Enrollment = () => {

    const location = useLocation()
    const courseId = location.pathname.split('/')[2]

    const [isUpdating, setIsUpdating] = useState(false)

    const { currentUser } = useAuthStore()

    const [media, setMedia] = useState<{
            media: string,
            title: string
            author: {
                id: string
                username: string
            }
    }>()
    const [rating, setRating] = useState(0)
    const [isFetching, setIsFetching] = useState(true)

    const getEnrollment = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enrollment/get-enrollment/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })


            if(response.status === 200) {
                setMedia(response.data.enrollment)
                setRating(response.data.previousRating)
            }
            setIsFetching(false)
        } catch (error) {
            setIsFetching(false)
        }
    }

    const rateCourse = async (rate: number) => {
        if(rate === rating) return
        if(isUpdating === true) return

        let previousRating = rating
        setIsUpdating(true)
        setRating(rate)

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/course/rate-course/${courseId}`, {
                rating: rate
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            console.log(response)
            setIsUpdating(false)
        } catch (error) {
            setIsUpdating(false)
            setRating(previousRating)
            toast.error("There was an error updating your rating. Please try again later")
        }
    }

    useEffect(() => {
        getEnrollment()
    }, [])

    return (
        <Wrapper>
            <div className="w-full flex-1 min-h-screen h-full max-w-8xl px-2 xl:px-0 py-4 gap-6 flex flex-col lg:flex-row">
            <div className="flex flex-col flex-1 max-w-8xl gap-2">
            {isFetching ? 
            <div className="w-5/6 h-8 bg-slate-100 shadow-sm animate-pulse"/> : 
            <h1 className="text-xl xs:text-3xl sm:text-4xl text-gray-800 font-bold">{media?.title}</h1>}
            {   isFetching ? <div className="w-36 xs:w-56 h-5 bg-slate-100 shadow-sm animate-pulse" /> :
                <p className="text-lg text-gray-600">By <a href={`/profile/${media?.author.id}`} className="font-medium">{media?.author.username}</a></p>}
            <div className="aspect-video max-w-6xl bg-slate-100 shadow border border-slate-200 my-4 relative">
                {media?.media && <video className="w-full h-full absolute top-0 left-0 z-30"  controls>
                    <source src={media?.media} />
                </video>}
            </div>
            {isFetching ? <div className="w-5/6 max-w-60 h-8 bg-slate-100 shadow-sm animate-pulse border border-gray-200" /> :<div className="flex gap-1">
                <Star className={`sm:w-7 sm:h-7 cursor-pointer ${rating >= 1 && "text-yellow-400"}`} onClick={() => rateCourse(1)}/>
                <Star className={`sm:w-7 sm:h-7 cursor-pointer ${rating >= 2 && "text-yellow-400"}`} onClick={() => rateCourse(2)}/>
                <Star className={`sm:w-7 sm:h-7 cursor-pointer ${rating >= 3 && "text-yellow-400"}`} onClick={() => rateCourse(3)}/>
                <Star className={`sm:w-7 sm:h-7 cursor-pointer ${rating >= 4 && "text-yellow-400"}`} onClick={() => rateCourse(4)}/>
                <Star className={`sm:w-7 sm:h-7 cursor-pointer ${rating >= 5 && "text-yellow-400"}`} onClick={() => rateCourse(5)}/>
            </div>}
            </div>
            <div className="flex-1 lg:max-w-64 py-4 flex flex-col gap-6">
                <h2 className="text-2xl font-medium text-gray-700">More from this author</h2>
                {media?.author.id ? <MoreFromAuthor authorId={media?.author.id} 
                className=" xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-1"/> : null}
            </div>

            </div>
            <Toaster />
        </Wrapper>
    )
}

export default Enrollment