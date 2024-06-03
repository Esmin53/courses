import axios from "axios";
import { useEffect, useState } from "react";
import CoursesCarousel from "./CoursesCarousel";
import { Course } from "@/types";


const HomepageFeed = () => {
    const [courses, setCourses] = useState<Course[]>([])

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
        <div className="w-full py-6">
            <h1 className="text-2xl xs:text-3xl font-bold text-gray-800">From zero to hero</h1>
            <p className="text-lg xs:text-xl my-2 xs:my-4">Find your future career path with us and get hired</p>
            <div className="hidden md:flex gap-4 items-center font-medium pt-2 pb-4 flex-wrap">
                <p className="cursor-pointer">Web Development</p>
                <p className="cursor-pointer">Mobile Development</p>
                <p className="cursor-pointer">Data Science</p>
                <p className="cursor-pointer">Game Development</p>
                <p className="cursor-pointer">Machine Learning</p>
            </div>
            <div className="w-full border border-gray-300 shadow p-2 md:p-8 my-2">
                <h1 className="font-bold text-xl sm:text-2xl text-gray-800">From Hobby To Paycheck</h1>
                <p className="text-sm sm:text-md sm:w-3/4 py-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet deserunt soluta, deleniti nisi quos temporibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi impedit id ipsum minus veritatis eum consequuntur iusto amet nobis accusamus. sit! Similique aspernatur incidunt porro velit vel eum expedita hic! Voluptas ab aperiam deleniti!</p>
                <div className=" pt-6 w-full">
                    <CoursesCarousel coursesArray={courses} />
                </div>
            </div>
        </div>
    );
};

export default HomepageFeed;