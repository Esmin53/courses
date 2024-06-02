import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate, useSearchParams } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [ searchParams ] = useSearchParams()
    const redirectUrl = searchParams.get("src")

    const { signIn, currentUser  } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            if(!username.length || !password.length) {
                toast.error("Please provide valid username and password!")
                return
            }

            await axios.post(`http://localhost:3124/api/v1/auth/login`, {username, password}).then((res) => {
                if(res.status === 200) {
                    signIn(res.data)
                    toast.success("Login success. You will be redirected to homepage.")
                    if(redirectUrl) {
                        navigate(`/${redirectUrl}`)
                    } else {
                        navigate("/")
                    }
                } 
            })


        } catch (error: AxiosError | any) {
            if(error.response.status === 404 || error.response.status === 400) {
                toast.error("Incorrect username or password! Please try again.")
            } else {
                toast.error("Something went wrong. Please try again later.")
            }
        }
    }

    useEffect(() => {
        if(currentUser !== null) {
            navigate("/")
        }
    }, [])

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center">
            <form className="w-96 h-96 bg-slate-100 rounded-lg shadow border border-slate-200 p-2 flex flex-col gap-2 items-center justify-center"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <div className="w-full flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium">Username</label>
                    <input className={`w-full border-2 border-gray-900 rounded-md p-2 focus:outline-emerald-300`} placeholder="Username" 
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium">Password</label>
                    <input className={`w-full border-2 border-gray-900 rounded-md p-2 focus:outline-emerald-300`} placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                </div>
                <button className="w-full rounded-md text-white h-12 bg-[#FF725C] mt-4 hover:opacity-95" type="submit">
                    Login
                </button>
            </form>
            <Toaster richColors={true} position="top-center"/>
        </div>
    )
}

export default Login