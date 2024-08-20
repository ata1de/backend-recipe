import 'dotenv/config';
import * as yup from 'yup';

const envSchema = yup.object({
  PORT: yup.number().default(3333).required(),
  NODE_ENV: yup.mixed().oneOf(['dev', 'prod', 'test']).default('dev').required(),
  JWT_SECRET: yup.string().required() // Adicione a variável JWT_SECRET aqui
});

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET
};

const validatedEnv = envSchema.validateSync(env, { abortEarly: false });

export const config = {
  PORT: validatedEnv.PORT,
  NODE_ENV: validatedEnv.NODE_ENV,
  JWT_SECRET: validatedEnv.JWT_SECRET
};
