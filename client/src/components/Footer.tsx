import { Facebook, Github, Instagram } from "lucide-react"

const Footer = () => {

    return (
        <div className="w-full min-h-20 bg-zinc-900 flex justify-center items-center py-2 px-2 xl:px-0 ">
            <div className="max-w-8xl w-full h-full flex justify-around md:justify-between items-center flex-wrap gap-2.5">
                <a href="/" className="text-2xl sm:text-3xl md:text-4xl text-primary-purple font-bold">DevCourses</a>
                <div className="flex text-white font-medium gap-2 sm:gap-4 text-sm sm:text-base justify-center items-center ">
                    <a href="/">Home</a>
                    <a href="/about-us">About us</a>
                    <a href="/courses?tags=&q=">Courses</a>
                    <a href="/become-a-tutor">Join us</a>
                </div>
                <div className="flex gap-2 md:gap-4">
                    <a href='https://www.instagram.com/tufekciic/' target="_blank">
                        <Instagram className="text-secondary-purple cursor-pointer"/>
                    </a>
                    <a href='https://www.facebook.com/esmin.tufekcic/' target="_blank">
                        <Facebook className="text-secondary-purple cursor-pointer"/>
                    </a>
                    <a href='https://github.com/Esmin53/courses' target="_blank">
                        <Github className="text-secondary-purple cursor-pointer"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer