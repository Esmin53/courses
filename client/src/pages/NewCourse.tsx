import Navbar from "@/components/Navbar";
import { LucideLoader2, Plus, UploadCloud, X } from "lucide-react";
import { LANGUAGES } from "../../../shared/constants/languages"
import { PROGRAMMING_AREAS } from "../../../shared/constants/areas"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseValidator, CourseValidatorType} from "../../../shared/validators/course"
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Wrapper from "@/components/Wrapper";

export const NewCourse = () => {

    const landsAndAreas = [...LANGUAGES, ...PROGRAMMING_AREAS]
    const [tags, setTags] = useState< {label: string, value: string}[]>([])
    const [media, setMedia] = useState<File | null>()
    const [thumbnail, setThumbnail] = useState<File | null>()
    const [mediaPreview, setMediaPreview] = useState<string | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const { currentUser } = useAuthStore()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const thumbnailInputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CourseValidatorType>({
        resolver: zodResolver(CourseValidator)
    })

    const uploadVideo = async () => {

        if(!media) {
            return
        }
        const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/avi'];
        if (!validVideoTypes.includes(media.type)) {
            console.error("Invalid file type. Only video files are accepted.");
            toast.error("Please provide valid video lesson!")
            return;
        }

        try {
            const videoRef = ref(storage, `videos/${media.name + uuidv4()}`)

            await uploadBytes(videoRef, media)
    
            const downloadRef = await getDownloadURL(videoRef)
    
            return downloadRef
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.error("There was an error uploading your video")
            return;
        }

    }

    const uploadThumbnail = async () => {

        if(!thumbnail) {
            return
        }


        try {
            const photoRef = ref(storage, `thumbnails/${thumbnail.name + uuidv4()}`)

            await uploadBytes(photoRef, thumbnail)
    
            const downloadRef = await getDownloadURL(photoRef)
    
            return downloadRef
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.error("There was an error uploading your video")
            return;
        }

    }

    const onSubmit: SubmitHandler<CourseValidatorType> = async ({title, description, price, media, tags, thumbnail}) => {
        setIsUploading(true)
        try {
            media = await uploadVideo()
            thumbnail = await uploadThumbnail()

            if(media && thumbnail) {
                const response = await axios.post(`http://localhost:3124/api/v1/course/upload-course`, {
                    title,
                    description,
                    price,
                    tags,
                    media,
                    thumbnail
                }, {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    }
                })

                if(response.status === 200 && response.data.success === true) {
                    setIsUploading(false)
                    toast.success("Your course has been created successfully. You will be redirected shortly.")
                    navigate(`/course/${response.data.courseId}`)
                }

                console.log(response)
                setIsUploading(false)
            } else {
                toast.error("There was an error creating your course. Please try again.")
                setIsUploading(false)
            }

        } catch (error) {
            console.log(error)
            toast.error("There was an error creating your course. Please try again.")
            setIsUploading(false)
        }
    }

    const handleTags = (test: {label: string, value: string}) => {
        let tagAdded = tags.find((item) => item.value === test.value)

        if(tagAdded) {
            setTags(tags.filter((item) => item.value !== test.value))    
        } else {
            setTags([...tags, test])
        }
    }

    useEffect(() => {
        if(media) {
            let url = URL.createObjectURL(media)
            setMediaPreview(url)
        } else {
            setMediaPreview(null)
        }
    }, [media])
    
    useEffect(() => {
        if(thumbnail) {
            let url = URL.createObjectURL(thumbnail)
            setThumbnailPreview(url)
        } else {
            setThumbnailPreview(null)
        }
    }, [thumbnail])

    useEffect(() => {
        setValue('tags', tags.map((item) => item.value))
    }, [tags])


    return (
        <Wrapper>
            <div className="flex flex-col flex-1 min-h-screen justify-center items-center relative px-2">
            {isUploading ? <div className="w-full h-full absolute top-0 left-0 bg-gray-900/40 flex items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center text-white">
                    <LucideLoader2 className="animate-spin w-10 h-10" />
                    <h2 className="text-xl font-bold text-center">Your course is being created. This might take some time 
                    <br /> depending on the size of your video</h2>
                </div>
            </div> : null}
            <div className="flex-1 w-full max-w-8xl justify-self-center">
                <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-10 h-full">
                    <div className="w-full md:w-1/2 flex flex-col gap-2">
                        { media ? <div className="w-full flex items-center justify-between">
                            <p className="lg:text-lg font-medium line-clamp-1">{media?.name}</p>
                            <X className=" text-red-600 cursor-pointer" onClick={() => setMedia(null)}/>
                        </div> : null}
                        <div className="aspect-video border border-primary-purple rounded-md border-dashed w-full relative cursor-pointer 
                        max-h-[25rem] z-30" onClick={() => fileInputRef.current && !media && fileInputRef?.current.click()}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                                <UploadCloud className="w-8 md:w-16 h-8 md:h-16 text-secondary-purple z-20"/>
                                <h2 className=" sm:text-xl md:text-2xl text-secondary-purple text-center z-20">Upload a video</h2>
                            </div>
                            {mediaPreview && <video className="w-full h-full absolute top-0 left-0 z-30"  controls>
                                <source src={mediaPreview} />
                            </video>}
                        </div>

                        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-12">
                            <div className="w-fit h-full ">
                                <p className="text-lg font-medium text-gray-800">Upload your thumbnail</p>
                                {thumbnail && <p className="text-lg text-red-600 cursor-pointer" onClick={() => setThumbnail(null)}>Remove</p>}
                            </div>
                            <div className="border border-primary-purple rounded-md border-dashed h-full aspect-video  md:flex-1 relative cursor-pointer"
                            onClick={() => thumbnailInputRef.current && !thumbnail && thumbnailInputRef?.current.click()}>
                                {thumbnailPreview && <img src={thumbnailPreview} className="w-full h-full aspect-video absolute 
                                top-0 left-0 z-30"/>}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                                <UploadCloud className="w-6 md:w-10 h-6 md:h-10 text-secondary-purple z-20"/>
                                <h2 className=" sm:text-lg md:text-xl text-secondary-purple text-center z-20">Upload an image</h2>
                            </div>
                            </div>
                        </div>

                        <h2 className="text-lg sm:text-xl font-medium py-2 border-b border-secondary-purple">Programming languages and relevant areas:</h2>
                        <div className="w-full flex flex-wrap gap-2 py-2">
                        {tags?.map((item) => (
                                        <div key={item.value} className="py-1 px-2 rounded-sm bg-primary-purple text-sm sm:text-md text-white cursor-pointer"
                                        onClick={() => handleTags(item)}>{item.label}</div>
                                    ))}
                        </div>
                        </div>
                    <div className="w-full md:w-1/2 h-full flex-1">
                        <h1 className="text-2xl sm:text-3xl font-semibold mb-1 sm:mb-2">Create a new lesson</h1>
                        <p>Wellcome to course creator. Please provide course material and all other required information about your new video lesson here.</p>
                        <form className="w-full flex flex-col gap-4 py-4" 
                        onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full flex flex-col">
                                <input type="file" multiple={false} ref={fileInputRef} className="hidden" onChange={(e) => 
                                e.target.files?.length && setMedia(e.target.files[0])}/>
                                <input type="file" multiple={false} ref={thumbnailInputRef} className="hidden" onChange={(e) => 
                                e.target.files?.length && setThumbnail(e.target.files[0])}/>
                                <label htmlFor="title" className="text-sm font-medium">Title</label>
                                <input type="text" placeholder="Title" className="w-full py-1 border-2 border-gray-900 rounded-md px-1"
                                {...register('title')}/>
                                {errors.title ? <p className="text-xs text-red-400">{errors.title.message}</p> : null}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="title" className="text-sm font-medium">Description</label>
                                <textarea className="w-full py-1 border-2 border-gray-900 rounded-md px-1 min-h-44" {...register('description')}
                                placeholder="Hi, in this course you will learn how to..." />
                                {errors.description ? <p className="text-xs text-red-400">{errors.description.message}</p> : null}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="title" className="text-sm font-medium">Price</label>
                                <input type="text" step='0.01' placeholder="Price" className="w-full py-1 border-2 border-gray-900 rounded-md px-1"
                                {...register('price', {
                                    valueAsNumber: true
                                })}/>
                                {errors.price ? <p className="text-xs text-red-400">{errors.price.message}</p> : null}
                            </div>

                            <Dialog>
                                <DialogTrigger className="w-full flex items-center justify-between text-primary-purple cursor-pointer">
                                    <p className="text-lg ">Choose some tags</p>
                                    <Plus />
                                </DialogTrigger>
                                <DialogContent className="bg-white">
                                    <DialogHeader>
                                    <DialogTitle>Programming languages and other tags</DialogTitle>
                                    <DialogDescription>
                                        {tags.length ? (
                                            <div className="flex gap-2 text-primary-purple font-medium">
                                                {tags.map((item, index) => <p key={index}>{item.label},</p>)}
                                            </div>
                                        ) : (<p className="text-gray-600 font-medium">Please choose atleast one tag</p>)}
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="w-full flex gap-2 flex-wrap">
                                    {landsAndAreas.map((item) => (
                                        <div key={item.value} className={cn("py-1 px-2 rounded-sm bg-secondary-purple cursor-pointer", {
                                            "bg-primary-purple text-white": tags.find((tag) => tag.value === item.value)
                                        })}
                                        onClick={() => handleTags(item)}>{item.label}</div>
                                    ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {errors.tags ? <p className="text-xs text-red-400">{errors.tags.message}</p> : null}
                            
                            <button className="w-full h-10 bg-primary-purple rounded-md border-none text-white shadow hover:opacity-90 
                            font-medium duration-150" type="submit">
                                Finish
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
        </Wrapper>
    )
}

export default NewCourse;