import { useEffect, useState } from "react"
import {AuthValidatorType, AuthValidator} from "../../../shared/validators/auth"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const navigate = useNavigate()
    const { currentUser } = useAuthStore()

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<AuthValidatorType>({
        resolver: zodResolver(AuthValidator)
    })

    const onSubmit: SubmitHandler<AuthValidatorType> = async ({username, password}) => {
        try {
            if(watch("password") !== confirmPassword) {
                return
            }

            const response = await axios.post(`http://localhost:3124/api/v1/auth/register`, {username, password})

            if(response.status === 200) {
                toast.success("You have registered successfully. You will be redirected to login.")
                navigate("/login")
            }
        } catch (error: AxiosError | any) {
            if(error.response.status === 409) {
                setError("username", {
                 type: "manual",
                 message: "That username is already taken. Please try a different one."
                })
            } else {
                toast.error("Something went wrong. Please try again later")
            }
        }
    }

    useEffect(() => {
        if(watch("password") !== confirmPassword) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }, [confirmPassword])

    useEffect(() => {
        if(currentUser !== null) {
            navigate("/")
        }
    }, [])

    return (
        <div className="w-full min-h-screen h-full relative flex gap-4 lg:gap-8 p-2 lg:p-0 justify-center items-center">
        <img src="https://img.freepik.com/free-vector/course-app-concept-illustration_114360-6219.jpg?t=st=1715378456~exp=1715382056~hmac=79bddc68d063a0031d854eccdf16796b499cd0c3ab9813f6f220a2de5c3f7a69&w=740" 
        className="hidden md:flex w-1/2 h-screen object-cover"/>
            <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center flex-1 max-h-[40rem]">
                <div className="w-full max-w-[30rem] lg:w-3/4 py-12 flex flex-col flex-1 justify-around">
                <div className="flex flex-col w-full gap-4">
        	        <h1 className="text-3xl xs:text-4xl font-bold text-center xs:text-start">Wellcome to <span className=" text-[#FF725C]">DevCourses</span></h1>
                    <p className="text-gray-500 font-medium text-sm text-center xs:text-start">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit similique <br /> tempora deleniti recusandae accusamus.</p>
                </div>
                <form className="w-full rounded-md flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium">Username</label>
                        <input className={`w-full border-2 ${errors.username && "border-red-400"} border-gray-900 rounded-md p-2 focus:outline-emerald-300`} placeholder="Username" 
                        {...register("username")}/>
                        {errors.username ? <p className="text-xs text-red-400">{errors.username.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium">Password</label>
                        <input className={`w-full border-2 ${errors.password && "border-red-400"} border-gray-900 rounded-md p-2 focus:outline-emerald-300`} placeholder="Password" 
                        {...register("password")} type="password"/>
                        {errors.password ? <p className="text-xs text-red-400">{errors.password.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="username" className="text-sm font-medium">Confirm Password</label>
                        <input className={`w-full border-2 ${confirmPasswordError && "border-red-400"} border-gray-900 rounded-md p-2 focus:outline-emerald-300`} placeholder="Confirm password" 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password"/>
                        {confirmPasswordError ? <p className="text-xs text-red-400">Confirm password filed must match password</p> : null}
                    </div>
                    
                    <button className="w-full rounded-md text-white h-10 xs:h-12 bg-[#FF725C] mt-4 hover:opacity-95 shadow" type="submit">
                        Register
                    </button>
                    <p className="text-sm ml-auto">Already registered? <a href="#" className="text-[#FF725C]">Sign In</a></p>
                </form>
                </div>
            </div>
            <Toaster richColors={true} position="top-center"/>
        </div>
    )
}

export default Register