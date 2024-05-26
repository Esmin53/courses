import { Request, Response } from "express";


export const uploadCourse = async (req: Request, res: Response) => {
    try {
        const body = req.body

        console.log(body)

        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false })
    }
}