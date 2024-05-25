import Navbar from "@/components/Navbar"
import { useAuthStore } from "@/store/useAuthStore"
import { Plus, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    
    const { currentUser } = useAuthStore()
    const navigate = useNavigate()
    
    
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <Navbar />
            <div className="flex-1 w-full max-w-8xl justify-self-center ">
                <div className="flex w-full gap-6">
                    <div className="w-52 h-52 bg-red-300">

                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="text-3xl font-medium">Esmin Tufekcic</h1>
                        <h2 className="text-xl py-2">Web Developer</h2>
                        <div className="w-full border border-gray-400 shadow-sm mb-4" />
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non repellat hic odit. Distinctio molestiae assumenda necessitatibus accusantium repellat nisi, eos blanditiis eaque reiciendis iste, ipsa suscipit non consectetur, dolores magni?</p>
                    </div>
                </div>
                <div className="w-full mt-6">
                    <div className="flex justify-between w-full">
                        <div>
                            <h1 className="text-xl font-semibold">My Courses</h1>
                            <p className="text-lg font-medium">All courses by asimbrkan</p>
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/new-course')}>
                            <p className="text-blue-500 font-semibold text-lg">New course </p>
                            <Plus  className="text-blue-500"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 py-4">
                        <div>
                            <div className="w-full h-44 bg-sky-500"></div>
                            <h2 className="font-semibold leading-5 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit kemal malovicic.</h2>
                            <p className="text-sm text-gray-600 font-medium">Esmin tufekcic, web developer</p>
                            <div className="flex gap-2 items-center">
                                <p className="font-bold">4.7</p>
                                <div className="flex">
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                </div>
                            </div>
                            <p className="font-bold text-lg">$25.50</p>
                        </div>
                        <div>
                            <div className="w-full h-44 bg-sky-500"></div>
                            <h2 className="font-semibold leading-5 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit kemal malovicic.</h2>
                            <p className="text-sm text-gray-600 font-medium">Esmin tufekcic, web developer</p>
                            <div className="flex gap-2 items-center">
                                <p className="font-bold">4.7</p>
                                <div className="flex">
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                </div>
                            </div>
                            <p className="font-bold text-lg">$25.50</p>
                        </div>
                        <div>
                            <div className="w-full h-44 bg-sky-500"></div>
                            <h2 className="font-semibold leading-5 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit kemal malovicic.</h2>
                            <p className="text-sm text-gray-600 font-medium">Esmin tufekcic, web developer</p>
                            <div className="flex gap-2 items-center">
                                <p className="font-bold">4.7</p>
                                <div className="flex">
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                    <Star  className="w-4 h-4 text-yellow-400"/>
                                </div>
                            </div>
                            <p className="font-bold text-lg">$25.50</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile