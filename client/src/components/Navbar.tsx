import { LogOut, Plus, User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"


const Navbar = () => {

    const {currentUser, signOut} = useAuthStore()
    const navigate = useNavigate()

    return (
        <div className="flex w-full items-center justify-center">
            <div className="w-full flex items-center justify-between max-w-8xl py-2 sm:py-4"> 
                <h1 className="text-xl sm:text-2xl font-semibold text-primary-purple cursor-pointer" onClick={() => navigate('/')}>WebCourses</h1>
                <SearchBar />
                <ul className="sm:flex items-center justify-center gap-4 hidden">
                    <li className="cursor-pointer font-medium" onClick={() => navigate('/')}>Home</li>
                    <li className="cursor-pointer font-medium">About us</li>
                    <li className="cursor-pointer font-medium">Courses</li>
                    <li className="cursor-pointer font-medium" onClick={() => navigate('/become-a-tutor')}>Join Us</li>
                    <div className="w-0 h-7 bg-red border-[0.5px] border-zinc-200 shadow-sm" />
                    {
                        currentUser ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className=" border-secondary-purple rounded-full border-2 flex outline-none">
                                    <User  className="m-1 w-5 h-5 text-secondary-purple cursor-pointer"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="min-w-48 bg-white">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer w-full flex items-center hover:bg-zinc-100" onClick={() => navigate('/my-profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                    {currentUser?.user.role === 'TUTOR' ? 
                                    <DropdownMenuItem className="cursor-pointer w-full flex items-center hover:bg-zinc-100" onClick={() => navigate('/new-course')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>New course</span>
                                    </DropdownMenuItem> : null}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer w-full flex items-center hover:bg-zinc-100" onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                        ) : (
                            <>
                            <li className="p-1 border-2 rounded-lg border-primary-purple text-primary-purple hover:bg-primary-purple 
                            hover:text-white text-sm px-4 font-semibold duration-200 cursor-pointer" onClick={() => navigate('/login')}>Login</li>
                            <li className="bg-secondary-purple border-2 border-secondary-purple rounded-lg p-1 text-white 
                            font-semibold text-sm px-4 hover:opacity-85 cursor-pointer" onClick={() => navigate('/register')}>Register</li></>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar