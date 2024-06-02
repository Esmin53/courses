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
                role: true,
                profile_picture: true
            }
        })

        return res.status(200).json({ success: true, user: user })
    } catch (error) {
        return res.status(500).json({ success: false })
    }
}

export const uploadProfilePicture = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user

        const userExists = await db.user.findFirst({
            where: {
                id: user.id
            }
        })

        if(!userExists) {
            return res.status(401).json({ success: false, message: "No such user"})
        }

        const {profilePicture} = req.body;

        const updatedUser = await db.user.update({
            where: {
                id: user.id
            },
            data: {
                profile_picture: profilePicture
            }
        })

        return res.status(200).json({ success: true})

    } catch (error) {
        
    }
}