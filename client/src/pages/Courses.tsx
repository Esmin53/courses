import Navbar from "@/components/Navbar"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"


const Courses = () => {
    const [tags, setTags] = useState<string >("")
    const [searchParams, setSearchParams] = useSearchParams()

    const queryTags = searchParams.get('tags')

    console.log(queryTags)

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center px-2">
            <Navbar />
            <div className="w-full max-w-8xl flex-1 bg-red-400">

            </div>
        </div>
    )
}

export default Courses