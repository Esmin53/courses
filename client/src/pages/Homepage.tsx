import { useAuthStore } from "../store/useAuthStore"

const Homepage = () => {

    const {currentUser} = useAuthStore()

    return (
        <div>
            <h1>{currentUser?.user.username}</h1>
        </div>
    )
}

export default Homepage