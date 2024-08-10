import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const validate = (schema: { body?: AnySchema; params?: AnySchema}) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                await schema.body.validate(req.body, {abortEarly: false})
            }
            if (schema.params) {
                await schema.params.validate(req.params, {abortEarly: false})
            }
            next()
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    }
}

export default validate