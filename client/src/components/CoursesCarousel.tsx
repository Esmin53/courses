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
                        return <CarouselItem key={item.id} className="xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <CourseCard {...item}/>
                        </CarouselItem>
                    })}          
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex "/>
                <CarouselNext className="hidden sm:flex"/>
            </Carousel>
        </div>
    )
}

export default CoursesCarousel