import Wrapper from "@/components/Wrapper"
import { useAuthStore } from "@/store/useAuthStore"
import { User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"


const MyProfile = () => {

    const [user, setUser] = useState<User >()
    
    const { currentUser } = useAuthStore()

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-user/${currentUser?.user.id}`)

            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Wrapper>
            <div className="w-full max-w-8xl flex-1 flex">
                <div className="w-full flex gap-6">
                    <div className="w-52 h-52 bg-red-300">

                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="text-3xl font-medium">{user?.username}</h1>
                        <h2 className="text-xl py-2">{user?.specialization}</h2>
                        <div className="w-full border border-gray-400 shadow-sm mb-4" />
                        <p>{user?.description}</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default MyProfile