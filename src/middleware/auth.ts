import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import { jwtService } from "../http/authentication"
import { UserInstance } from "../models/User"
import { UserService } from "../services/userService"

export interface AuthenticateRequest extends Request {
    user?: UserInstance | null
}

export function authenticateJwt (req: AuthenticateRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({ error: 'Access Denied: No token provided' })
    }

    jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
          return res.status(401).json({ message: 'Access Denied: Unauthorized token' })
        }
    
    // truque do typescript para tipar o decoded
    UserService.findById((decoded as JwtPayload).id).then(user => {
        req.user = user
        next()
    })
    })
}