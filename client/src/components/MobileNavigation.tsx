import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useAuthStore } from "@/store/useAuthStore";
import { Sidebar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileNavigation = () => {
    const navigate = useNavigate()
    const { currentUser, signOut } = useAuthStore()
   
    return (
        <Sheet>
  <SheetTrigger>
    <Sidebar />
  </SheetTrigger>
  <SheetContent className="bg-white">
    <SheetHeader>
      <SheetTitle className="text-primary-purple justify-start flex">DevCourses</SheetTitle>
      <SheetDescription>

      </SheetDescription>
    </SheetHeader>
    <ul className="flex flex-col gap-2 py-4">
    <li className="cursor-pointer font-medium" onClick={() => navigate('/')}>Home</li>
        <li className="cursor-pointer font-medium">About us</li>
        <li className="cursor-pointer font-medium">Courses</li>
        <li className="cursor-pointer font-medium" onClick={() => navigate('/become-a-tutor')}>Join Us</li>
        { currentUser?.user.role === "TUTOR" ? <>
        <li onClick={() => navigate('/new-course')} className="cursor-pointer font-medium">New course</li>
        </> : null}
        { !currentUser ? (<>
        <li className="cursor-pointer font-medium" onClick={() => navigate('/login')}>Log in</li>
        <li className="cursor-pointer font-medium" onClick={() => navigate('/register')}>Register</li>
        </>) : (
            <li className="cursor-pointer font-medium" onClick={() => signOut()}>Sign out</li>
        )}
    </ul>
  </SheetContent>
</Sheet>
    )
};

export default MobileNavigation;