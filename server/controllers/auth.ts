import { Request, Response } from 'express';
import { AuthValidator } from '../../shared/validators/auth';
import { db } from '../db/db';
import bcrypt from "bcrypt"

export const register = async (req: Request, res: Response) => {
    try {
        const {
            username, 
            password
        } = AuthValidator.parse(req.body)

        const userExists = await db.user.findFirst({
            where: {
                username
            }
        })

        if(userExists) {
            return res.status(409).json({ error: 'Username is already taken', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await db.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        res.status(200).json({success: true})
    } catch (error) {
        
    }
}