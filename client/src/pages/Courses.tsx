import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { FilterX, Star, StarHalf } from "lucide-react"
import Pagination from "@/components/Pagination"
import Wrapper from "@/components/Wrapper"


const Courses = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [pages, setPages] = useState<number >(1)
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
    const [isFetching, setIsFetching] = useState(true)

    const queryTags = searchParams.get('tags')
    const querySearch = searchParams.get('q')
    const currentPage = searchParams.get("page") || 1

    const navigate = useNavigate()

    const getCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/course/get-courses?tags=${queryTags}&q=${querySearch}&page=${currentPage}`)

            setResults(response.data.courses)
            setPages(response.data.pages)
            setIsFetching(false)
        } catch (error) {
            setIsFetching(false)
        }
    }

    useEffect(() => {
        getCourses()
    }, [searchParams])

    return (
        <Wrapper>
                    <div className="w-full h-full flex-1 flex flex-col items-center px-2">
            <div className="w-full max-w-8xl flex-1">
                <div className="w-full py-4 my-4 flex flex-col gap-6 border-b border-gray-400">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Showing results for "{querySearch?.length ? querySearch : queryTags}"</h1>
                    <div className="flex gap-2">
                        <div className="h-10 w-20 sm:w-24 sm:h-14 border border-gray-600 shadow-sm flex items-center justify-center 
                        cursor-pointer"
                        onClick={() =>{ 
                        navigate('/courses?tags=&q=&page=1')
                        }}>
                            <FilterX />
                            <p className="text-lg font-medium">Filter</p>
                        </div>
                        <div className="min-w-24 sm:min-w-36 h-10 sm:h-14 border border-gray-600 shadow-sm flex flex-col p-2 justify-center cursor-pointer">
                            <p className="text-sm font-medium">Sort By</p>

                        </div>
                    </div>
                </div>
                <div className="flex gap-6 w-full h-full">

                {isFetching ? <div className="w-full flex flex-col gap-3 sm:gap-6">
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                        <div className="w-full h-48 bg-slate-100 shadow animate-pulse" />
                </div> : <div className="flex-1 flex flex-col gap-2">
                    { 
                        results?.map((item, i) => {

                            let rating: React.ReactNode[] = []

                            for(let i = 0; i < item.averageRating; i++) {
                               
                                if(i % item.averageRating !== 0 && i == Math.floor(item.averageRating)) {
                                    rating.push(<StarHalf className="w-4 h-4 text-yellow-400" key={i}/>)
                                } else {
                                    rating.push(<Star className="w-4 h-4 text-yellow-400" key={i}/>)
                                }        
                            }

                            return <div className="w-full min-h-48 py-4 flex flex-col sm:flex-row gap-2 border-b border-gray-400 cursor-pointer"
                            onClick={() => navigate(`/course/${item.id}`)}>
                                <img src={item.thumbnail} className="aspect-video sm:max-w-72
                                " />
                                <div className="flex flex-col flex-1 px-2">
                                    <div className="flex justify-between w-full gap-4">
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
                </div>}
                </div>
            </div>
            <Pagination pages={pages}/>
        </div>
        </Wrapper>
    )
}

export default Courses