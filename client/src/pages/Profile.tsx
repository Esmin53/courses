import Navbar from "@/components/Navbar"
import { useAuthStore } from "@/store/useAuthStore"

const Profile = () => {
    
    const { currentUser } = useAuthStore()
    
    return (
        <div>
            <Navbar />
            <p>{currentUser?.user.username}</p>
        </div>
    )
}

export default Profile