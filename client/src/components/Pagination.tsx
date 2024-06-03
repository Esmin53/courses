import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";


const Pagination = ({pages}: {pages: number}) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const queryTags = searchParams.get('tags')
    const querySearch = searchParams.get('q')
    const currentPage = Number(searchParams.get("page")) || 1

    console.log(pages)

    const navigate = useNavigate()

    return (
        <div className="w-full justify-center items-center flex py-4">
            <div className="w-full max-w-8xl h-14 flex justify-center items-center gap-4">
                <div className="xs:w-10 w-8 xs:h-10 h-8 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer"
                onClick={() => currentPage - 1 !== 0 && navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=${currentPage - 1}`)}>
                    <ChevronLeft className="text-gray-600"/>
                </div>
                {pages >= 1 ? <div className="text-lg text-primary-purple font-semibold cursor-pointer" 
                onClick={() => navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=1`)}>
                    <p>1</p>
                </div> : null}
                {pages >= 2 ? <div className="text-lg text-primary-purple font-semibold cursor-pointer"
                onClick={() => navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=2`)}>
                    <p>2</p>
                </div> : null}
                {pages >= 3 ? <div className="text-lg text-primary-purple font-semibold cursor-pointer"
                onClick={() => navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=3`)}>
                    <p>3</p>
                </div> : null}
                {pages > 3 ? <div className="text-lg text-gray-800 font-semibold flex">
                    <Dot />
                    <Dot className="-ml-4"/>
                    <Dot className="-ml-4"/>
                </div> : null}
                {pages > 3 ? <div className="text-lg text-primary-purple font-semibold cursor-pointer"
                onClick={() => navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=${pages}`)}>
                    <p>{pages}</p>
                </div> : null}
                <div className="xs:w-10 w-8 xs:h-10 h-8 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer"
                onClick={() => currentPage + 1 <= pages && navigate(`/courses?tags=${queryTags}&q=${querySearch}&page=${currentPage + 1}`)}>
                    <ChevronRight className="text-gray-600"/>
                </div>
            </div>
        </div>
    )
}

export default Pagination;