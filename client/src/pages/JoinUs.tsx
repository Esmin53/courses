import Wrapper from "@/components/Wrapper"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"


const JoinUs = () => {

    const [description, setDescription] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [terms, setTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { currentUser, updateUser } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(!terms) {
            toast.error("Please agree on terms and conditions before continuing")
            return
        } else if(description.length < 20 || description.length > 300) {
            toast.error("Description must be between 20 and 300 characters")
            return
        } else if(specialization.length < 2) {
            toast.error("Please provide your specializaton!")
            return
        }

        setIsLoading(true)

        try {
            
            await axios.post(`http://localhost:3124/api/v1/auth/become-a-tutor`, {description, specialization}, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            }).then((res) => {
                setIsLoading(false)
                if(res.status === 200) {
                    updateUser(res.data.userInfo)
                    toast.success("You have successfully become a tutor. Congratulations!")
                    navigate('/my-profile')
                }
            })

            

        } catch (error) {
            toast.error('Something went wrong. Please try again later.')
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!currentUser) {
            navigate('/login')
        } else if (currentUser.user.role !== "STUDENT") {
            navigate('/')
        }

    }, [])

    return (
        <Wrapper>
            <div className="w-full min-h-screen flex-1 px-2 gap-2 flex flex-col">
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="w-full h-full max-w-8xl flex justify-center items-center ">
                    <img src="https://img.freepik.com/free-vector/color-theory-online-studying-web-design-basics-drawing-tutorial-interior-designer-female-artist-cartoon-character-holding-pencil_335657-3450.jpg?t=st=1716412666~exp=1716416266~hmac=e42ca0eaff3a6860fe1b9d97ef071827ccbe088de7b32166d751aefefbe8f308&w=740"
                    className="hidden md:flex md:w-[27.5rem] lg:w-[37.5rem]" />
                    <div className="flex-1 w-full h-full flex justify-center">
                        <form className="w-full max-w-[30rem] lg:w-[30rem] bg-white p-2 gap-6 flex flex-col" onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>
                            <div className="w-full flex flex-col gap-2">
                                <h1 className="text-center text-primary-purple text-4xl font-semibold">Dev Courses</h1>
                                <p className=" text-sm font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odio ipsum deleniti cumque modi.</p>
                            </div>
                            <div>
                                <label htmlFor="specialization" className="text-gray-900 font-medium">Your specialization</label>
                                <input type="text" className="border-gray-900 border-2 w-full h-10 px-1 rounded-md" value={specialization}
                                placeholder="Web Developer, self taught, youtuber etc..." onChange={(e) => setSpecialization(e.target.value)}/>
                            </div>
                            <div>
                                <p className="text-gray-900 font-medium">Tell your students more about you</p>
                                <textarea className="w-full border-2 border-gray-900 rounded min-h-36 px-1"  placeholder="Hello, my name is..."
                                value={description} onChange={(e) => setDescription(e.target.value)}/>
                                <div className="flex gap-2 items-start justify-start">
                                    <Checkbox className="border-gray-900" checked={terms} onClick={() => setTerms(prev => !prev)}/>
                                    <p className="text-xs font-medium">By checking this box you agree with our terms and conditions for being a tutor</p>
                                </div>
                            </div>
                            <button type="submit"
                            className="w-full h-10 bg-primary-purple rounded-md text-white font-medium shadow hover:opacity-90 duration-150">
                                    { isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Become a tutor"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" richColors/>
        </div>
        </Wrapper>
    )
}

export default JoinUs