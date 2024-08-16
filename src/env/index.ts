import 'dotenv/config';
import * as yup from 'yup';

// Define o esquema de validação com yup
const envSchema = yup.object({
  PORT: yup.number().default(3333).required(),
  NODE_ENV: yup.mixed().oneOf(['dev', 'prod', 'test']).default('dev').required(),
  JWT_SECRET: yup.string().required() // Adicione a variável JWT_SECRET aqui
});

// Cria um objeto com as variáveis de ambiente
const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET
};

// Valida as variáveis de ambiente usando o esquema
const validatedEnv = envSchema.validateSync(env, { abortEarly: false });

// Exporta as variáveis de ambiente validadas
export const config = {
  PORT: validatedEnv.PORT,
  NODE_ENV: validatedEnv.NODE_ENV,
  JWT_SECRET: validatedEnv.JWT_SECRET
};
