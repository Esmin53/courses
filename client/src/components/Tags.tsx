import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { LANGUAGES } from "../../../shared/constants/languages"
import { PROGRAMMING_AREAS } from "../../../shared/constants/areas"
  

const Tags = () => {

    return (
        <div className="w-full py-4 xs:py-6">
            <h1 className="text-2xl xs:text-3xl font-bold text-gray-800">A broad selection of categories</h1>
            <p className="text-lg xs:text-xl my-2 xs:my-4">Choose from 81 computer science areas and programming languages</p>
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Programming languages</AccordionTrigger>
                    <AccordionContent className="w-full flex gap-2 sm:gap-4 lg:gap-6 flex-wrap items-center justify-between">
                    {LANGUAGES.map((item) => {
                        return <a key={item.value} href={`/courses?tags=${item.value}&q=&page=1`} className="text-primary-purple text-sm sm:text-md lg:text-lg font-medium">{item.label}</a>
                    })}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Computer science areas</AccordionTrigger>
                    <AccordionContent className="w-full flex gap-2 sm:gap-4 lg:gap-6 flex-wrap items-center justify-between">
                        {PROGRAMMING_AREAS.map((item) => {
                            return <a key={item.value} href={`/courses?tags=${item.value}&q=&page=1`} className="text-primary-purple text-sm sm:text-md lg:text-lg font-medium">{item.label}</a>
                        })}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
} 

export default Tags