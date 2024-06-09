import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader2 } from "lucide-react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const [ searchParams ] = useSearchParams()
    const redirectUrl = searchParams.get("src")

    const { signIn, currentUser  } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(isLoading) return
        setIsLoading(true)
        try {
            if(!username.length || !password.length) {
                toast.error("Please provide valid username and password!")
                return
            }

            await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {username, password}).then((res) => {
            setIsLoading(false)    
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
            setIsLoading(false)
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
            <div className="flex gap-6 flex-1 max-w-5xl max-h-[40rem] md:bg-slate-100 w-screen h-screen md:shadow md:border border-slate-200">
            <img className="hidden md:flex flex-1/2 max-w-[25rem] object-cover" alt="Tutor explaining " src="https://img.freepik.com/free-photo/female-teacher-home-holding-online-class-showing-students-lesson_23-2148680509.jpg?t=st=1717798739~exp=1717802339~hmac=91f9d0b6c0521d0acb73f105b8a2330009695822506c7c7259178071ff221d1b&w=740"/>
            <form className="flex-1 p-2 flex flex-col gap-2 items-center justify-around w-96"
            onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <h1 className="text-4xl w-full xs:w-5/6 font-semibold text-center">Wellcome back to 
                <span className="text-primary-purple"> DevCourses</span></h1>
                
                <div className="w-full xs:w-5/6 flex flex-col gap-2">
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
                </div>
                
                <div className="w-full xs:w-5/6 flex flex-col gap-1">
                    <button className="w-full rounded-md text-white h-12 bg-primary-purple hover:opacity-95" type="submit">
                        { isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Login"}
                    </button>
                    <p className="text-sm text-end">Not an user? <a href="/register" className="text-primary-purple">Sign Up.</a></p>
                </div>
            </form>
            </div>
            <Toaster richColors={true} position="top-center"/>
        </div>
    )
}

export default Login