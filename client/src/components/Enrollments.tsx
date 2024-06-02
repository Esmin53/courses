import { useAuthStore } from "@/store/useAuthStore"
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
  

const Enrollments = () => {
    const { currentUser } = useAuthStore();

    const navigate = useNavigate()

    const [enrollments, setEnrollments] = useState<{                
        id: string,
        course: {
            id: string,
            title: string,
            thumbnail: string,
            price: number
            author: {
                    id: string,
                    username: string
                    }
                }}[]>()

    const getEnrollments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/enrollment/get-enrollments`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            setEnrollments(response.data.enrollments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEnrollments()
    }, [])

    return (
        <div className="w-full shadow-sm border border-slate-200 p-4">
            <Table>
  <TableCaption>Your parchused courses.</TableCaption>
  <TableHeader>
    <TableRow>
        <TableHead className="">Image</TableHead>
      <TableHead className="">Id</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Title</TableHead>
      <TableHead className="text-right">Author</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {enrollments?.map((item) => (
        <TableRow className="cursor-pointer" key={item.id} onClick={() => navigate(`/enrollment/${item.course.id}`)}>
        <TableCell className="min-w-24">
            {item.course.thumbnail && <img className="h-10" src={item.course.thumbnail}/>}
        </TableCell>
        <TableCell className="">{item.course.id}</TableCell>
        <TableCell className="font-medium">${item.course.price}</TableCell>
        <TableCell>{item.course.title}</TableCell>
        <TableCell className="text-right">{item.course.author.username}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        </div>
    )
}

export default Enrollments