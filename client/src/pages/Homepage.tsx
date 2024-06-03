import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import HomepageFeed from "@/components/HomepageFeed"
import Tags from "@/components/Tags"


const Homepage = () => {

    const navigate = useNavigate()

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center px-2">
            <Navbar />
            <div className="w-full max-w-8xl flex-1">
            <div className="w-full  h-fit flex flex-col-reverse md:flex-row relative justify-center items-center">
                    <div className="w-full h-full  flex flex-col gap-4 sm:gap-6">
                        <h1 className="text-center sm:text-start text-4xl sm:text-5xl text-primary-purple font-bold">Dev Courses</h1>
                        <p className=" text-primary-purple sm:font-medium text-center sm:text-start">Best online learning website for developers and programmers. <br />
                            From hobby to paycheck, join us and start you computer science journey, expand your programming knowlege or become
                            a tutor and share your knowlege with the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className=" p-2 px-4 border-2 rounded-lg border-primary-purple text-primary-purple hover:bg-primary-purple 
                            hover:text-white font-semibold duration-200" onClick={() => navigate('/become-a-tutor')}>Become a tutor</button>
                            <button className="h-10 bg-secondary-purple border-2 border-secondary-purple rounded-lg text-white 
                            font-semibold px-4 hover:opacity-85 shadow">Start learning</button>
                        </div>
                    </div>

                <img src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?t=st=1716328129~exp=1716331729~hmac=553e4746225d2a03d267262368d21e2bb756c73afc049ebc15c247a01796e489&w=740"
                className="w-full sm:h-[30rem] lg:h-[37.5rem] object-cover" />
            </div>
            <HomepageFeed />
            <Tags />
            </div>
        </div>
    )
}

export default Homepage