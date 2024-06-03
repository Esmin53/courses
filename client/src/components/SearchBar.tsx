import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import axios from "axios";


const SearchBar = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [tags, setTags] = useState(searchParams.get("tags") || "")
    const [results, setResults] = useState<{
        title: string
        id: string
        price: string
        thumbnail: string
        author: {
            id: string,
            username: string,
            specialization: string
        },
        averageRating: number
    }[]>()

    const [q, setQ] = useState<string >("")
    const [hideResults, setHideResults] = useState(true)

    const searchBarRef = useRef<HTMLDivElement>(null)

    const getSearchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:3124/api/v1/course/get-courses?tags=${tags}&q=${q}`)

            setResults(response.data.courses)
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event: React.MouseEvent) => {
            if ( !searchBarRef.current?.contains(event.target as Node)) {
                setHideResults(true)
            }  else {
                setHideResults(false)
            } 
          };

          //@ts-ignore
          window.addEventListener("mousedown", handleClickOutside);

          return () => {
            //@ts-expect-error
            window.removeEventListener("mousedown", handleClickOutside);
          };

      }, [searchBarRef]);

      useEffect(() => {
        getSearchResults()
      }, [q])

    return (
        <div className={cn("flex flex-col flex-1 max-w-[37.5rem] relative w-full md:w-fit")} ref={searchBarRef}>
            <div className={cn("w-full h-9 rounded-full border border-gray-600 bg-slate-50 shadow-sm flex gap-2 items-center px-2")}>
                <Search className="w-6 h-6 md:w-7 md:h-7 text-primary-purple"/>
                <input type="text" className="flex flex-1 border-none h-full py-auto bg-transparent outline-none 
                text-lg" placeholder="Search..."
                value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/courses?tags=${tags}&q=${q}`)}/>
            </div>
            <div className={cn("w-full h-fit bg-white border border-gray-300 shadow absolute -bottom-1 translate-y-[100%] z-40 p-2", {
                "hidden": hideResults
            })}>
                {results?.map((course) => (
                    <div className="w-full sm:h-14 cursor-pointer hover:bg-slate-50 duration-100 flex gap-4 px-2 py-2 sm:border-b-0 border-b border-gray-400" key={course.id} onClick={() => navigate(`/course/${course.id}`)}>
                        <img src={course.thumbnail} className="aspect-video hidden sm:flex"/>
                        <div className="flex flex-col">
                            <h1 className="text-sm sm:text-lg line-clamp-2 sm:line-clamp-1">{course.title}</h1>
                            <p className="text-sm text-gray-500"><span className="text-gray-800 font-medium">By </span>
                            {course.author.username}</p>
                        </div>

                    </div>
                ))}
                {!results?.length ? (<p className="text-gray-400 font-medium py-6">There are no courses that match your search</p>) : null}
            </div>
        </div>
    )
}

export default SearchBar;