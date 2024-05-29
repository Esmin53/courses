import { Star, StarHalf } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
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
}

const CourseCard = ({title, author, price, id, averageRating, thumbnail}: CourseCardProps) => {

    const navigate = useNavigate()

    let rating: React.ReactNode[] = []
    
    for(let i = 0; i < averageRating; i++) {
       
        if(i % averageRating !== 0 && i == Math.floor(averageRating)) {
            rating.push(<StarHalf className="w-4 h-4 text-yellow-400"/>)
        } else {
            rating.push(<Star className="w-4 h-4 text-yellow-400"/>)
        }        
    }

    return (
        <div onClick={() => navigate(`/course/${id}`)} className="cursor-pointer">
        <div className=" h-44 bg-sky-500 relative">
            <img src={thumbnail} alt="Course thumbnail" className="w-full h-full absolute top-0 left-0"/>
        </div>
        <h2 className="font-semibold leading-5 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 font-medium">{author.username}, {author.specialization}</p>
        <div className="flex gap-2 items-center">
            <p className="font-bold">{averageRating !== 0 ? averageRating : <span className="text-sm font-md text-gray-500">No ratings so far</span>}</p>
            <div className="flex">
                {rating.map((item) => item)}
            </div>
        </div>
        <p className="font-bold text-lg">${price}</p>
    </div>
    )
}

export default CourseCard;