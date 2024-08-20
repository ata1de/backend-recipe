import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { DeniedAccess } from "../errors/deniedAccess"
import { jwtService } from "../http/services/JwtService"
import { UserService } from "../http/services/userService"
import { UserInstance } from "../models/User"

export interface AuthenticateRequest extends Request {
    user?: UserInstance | null
}

export function authenticateJwt (req: AuthenticateRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token

    try {

        if (!token) {
            throw new DeniedAccess()
        }
    
        jwtService.verifyToken(token, (err, decoded) => {
            if (err || typeof decoded === 'undefined') {
                throw new DeniedAccess()
            }
        
            // truque do typescript para tipar o decoded
            UserService.findById((decoded as JwtPayload).id).then(user => {
                req.user = user
                next()
            })
        })
        
    } catch (error) {
        if (error instanceof DeniedAccess) {
            return res.status(401).json({message: error.message })
        }
    }

}