import { Course } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import CourseCard from "./CourseCard";

const CoursesCarousel = ({coursesArray}: {
    coursesArray: Course[]
}) => {

    return (
        <div className="w-full">
            <Carousel >
                <CarouselContent >
                {coursesArray?.map((item) => {
                        return <CarouselItem key={item.id} className="basis-1/5">
                            <CourseCard {...item}/>
                        </CarouselItem>
                    })}          
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CoursesCarousel