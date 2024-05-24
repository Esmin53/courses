import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
           return res.status(401).json({ msg: "Unauthorized!"})
        }

        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET!, (err, data) => {
            if (err) {
                return res.status(401).json({err})
            }

            if (typeof data=== 'string' || typeof data === 'undefined') {
                return res.status(401).json({ msg: 'Token is not valid' });
              }

            
              
            res.locals.user = data.user
            
         })
         next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false})
    }
}