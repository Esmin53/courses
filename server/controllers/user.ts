import { Request, Response } from "express"
import { db } from "../db/db";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const user = await db.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                specialization: true,
                description: true,
                role: true
            }
        })

        return res.status(200).json({ success: true, user: user })
    } catch (error) {
        return res.status(500).json({ success: false })
    }
}