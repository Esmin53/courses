import { Request, Response } from 'express';
import { AuthValidator } from '../../shared/validators/auth';
import { db } from '../db/db';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({ success: false })
        }

        const user = await db.user.findFirst({
            where: {
                username
            }
        })

        if(!user) {
            return res.status(404).json({success: false})
        }

        const isMatch = await bcrypt.compare(password, user?.password!)

        if(!isMatch) {
            return res.status(400).json({success: false})
        }

        const payload = { user: { id: user.id, username: user.username }}

        jwt.sign(
            payload,
            process.env.JWT_SECRET!,
            {expiresIn: "30d"},
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({ 
                    token: token,
                    id: user.id,
                    username: user.username
                }); // Return the token to the client
              }

        )
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}