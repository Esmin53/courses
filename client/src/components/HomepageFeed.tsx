import axios from "axios";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";


const HomepageFeed = () => {
    const [courses, setCourses] = useState<{
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

    const getCourses = async () => {
        try {
            
            const response = await axios.get(`http://localhost:3124/api/v1/course/get-courses?tags=web-development,mobile-development,data-science,game-development,machine-learning`)

            console.log(response.data)
            setCourses(response.data.courses)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-800">A broad selection of categories</h1>
            <p className="text-xl my-4">Choose from 81 computer science areas and programming languages</p>
            <div className="flex gap-4 items-center font-medium pt-2 pb-4 flex-wrap">
                <p className="cursor-pointer">Web Development</p>
                <p className="cursor-pointer">Mobile Development</p>
                <p className="cursor-pointer">Data Science</p>
                <p className="cursor-pointer">Game Development</p>
                <p className="cursor-pointer">Machine Learning</p>
                <p className="cursor-pointer">Others</p>
            </div>
            <div className="w-full border border-gray-300 shadow p-8 my-2">
                <h1 className="font-bold text-2xl text-gray-800">From Hobby To Paycheck</h1>
                <p className="w-3/4 py-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet deserunt soluta, deleniti nisi quos temporibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi impedit id ipsum minus veritatis eum consequuntur iusto amet nobis accusamus. sit! Similique aspernatur incidunt porro velit vel eum expedita hic! Voluptas ab aperiam deleniti!</p>
                <div className=" pt-6">
                    <Carousel >
                        <CarouselContent >
                        {courses?.map((item) => {
                        return <CarouselItem key={item.id} className="basis-1/5">
                            <CourseCard {...item}/>
                        </CarouselItem>
                    })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default HomepageFeed;