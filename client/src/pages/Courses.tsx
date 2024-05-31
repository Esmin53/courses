import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Filter, Star, StarHalf } from "lucide-react"


const Courses = () => {
    const [tags, setTags] = useState<string[] >([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [results, setResults] = useState<{
        title: string
        id: string
        price: string
        thumbnail: string
        description: string
        author: {
            id: string,
            username: string,
            specialization: string
        },
        averageRating: number
    }[]>()

    const queryTags = searchParams.get('tags')
    const querySearch = searchParams.get('q')

    const navigate = useNavigate()

    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:3124/api/v1/course/get-courses?tags=${queryTags}&q=${querySearch}`)

            setResults(response.data.courses)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getCourses()
    }, [searchParams])

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center px-2">
            <Navbar />
            <div className="w-full max-w-8xl flex-1">
                <div className="w-full py-8 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-gray-800">Showing results for "{querySearch?.length ? querySearch : queryTags}"</h1>
                    <div className="flex gap-2">
                        <div className="w-24 h-14 border border-gray-600 shadow-sm flex items-center justify-center cursor-pointer"
                        onClick={() =>{ 
                        navigate('/courses?tags=&q=')
                        }}>
                            <Filter />
                            <p className="text-lg font-medium">Filter</p>
                        </div>
                        <div className="w-36 h-14 border border-gray-600 shadow-sm flex flex-col p-2 justify-center cursor-pointer">
                            <p className="text-sm font-medium">Sort By</p>

                        </div>
                    </div>
                </div>
                <div className="flex gap-6 w-full h-full">

                <div className="flex-1 flex flex-col gap-2">
                    { 
                        results?.map((item) => {

                            let rating: React.ReactNode[] = []

                            for(let i = 0; i < item.averageRating; i++) {
                               
                                if(i % item.averageRating !== 0 && i == Math.floor(item.averageRating)) {
                                    rating.push(<StarHalf className="w-4 h-4 text-yellow-400"/>)
                                } else {
                                    rating.push(<Star className="w-4 h-4 text-yellow-400"/>)
                                }        
                            }

                            return <div className="w-full h-48 py-4 flex gap-2 border-b border-gray-400 cursor-pointer"
                            onClick={() => navigate(`/course/${item.id}`)}>
                                <img src={item.thumbnail} className="aspect-video max-w-72
                                " />
                                <div className="flex flex-col flex-1 px-2">
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-gray-800 font-medium line-clamp-2">{item.title}</h1>
                                        <p className="text-lg font-semibold text-gray-800">${item.price}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 my-2">{item.description}</p>
                                    <p className="text-sm text-gray-600 font-medium">{item.author.username}, {item.author.specialization}</p>
                                    <div className="flex my-2 ">
                                        {rating.map((item) => item)}
                                        {item.averageRating === 0 ? <p className="text-sm">No ratings so far</p> : null}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                </div>

            </div>
        </div>
    )
}

export default Courses