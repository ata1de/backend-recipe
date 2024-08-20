import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";

const validate = (schema: { body?: AnySchema; params?: AnySchema }) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                await schema.body.validate(req.body, { abortEarly: false });
            }
            if (schema.params) {
                await schema.params.validate(req.params, { abortEarly: false });
            }
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    message: 'Validation error',
                    issues: error.errors, // Retorna os erros formatados pelo Yup
                });
            }
            next(error); // Passa o erro para o middleware de tratamento de erros global
        }
    }
}

export default validate;
