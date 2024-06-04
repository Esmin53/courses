import { useNavigate } from "react-router-dom"
import HomepageFeed from "@/components/HomepageFeed"
import Tags from "@/components/Tags"
import Featured from "@/components/Featured"
import Wrapper from "@/components/Wrapper"


const Homepage = () => {

    const navigate = useNavigate()

    return (
        <Wrapper>
                    <div className="w-full h-full min-h-screen flex flex-col items-center px-2">
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
            <Featured />
            <div className="w-full py-6 md:py-24 my-6 flex gap-4 md:gap-12 lg:gap-20 flex-col md:flex-row justify-center items-center">
                <div className="w-full sm:w-2/3 md:w-1/2 flex justify-start sm:justify-end md:h-96">
                    <img src="https://img.freepik.com/free-photo/front-view-woman-working-media-field-with-headphones_23-2148901111.jpg?t=st=1717504751~exp=1717508351~hmac=c6b29c82555feb284857b3ed340ba85608d812de557673c371e0262a0aea785e&w=740"
                    className="h-full max-h-96 object-cover border border-slate-200 shadow aspect-square" alt="Instructor giving a lecture"/>
                </div>
                <div className="w-full sm:w-1/2 md:h-96 flex items-center justify-start">
                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-center sm:text-start text-3xl sm:text-4xl text-gray-800 font-bold">Become an instructor</h1>
                        <p className="xs:text-lg md:w-5/6 lg:w-3/4">Instructors from around the world teach millions of learners on Devcourses.
                         We provide the platform to teach what you love.</p>
                        <button className="bg-gray-800 w-full xs:w-fit px-2 h-10 xs:h-12 text-white font-semibold shadow"
                        onClick={() => navigate('/become-a-tutor')}>Start teaching today</button>
                    </div>
                </div>
            </div>
            </div>
        </div>

        </Wrapper>

    )
}

export default Homepage