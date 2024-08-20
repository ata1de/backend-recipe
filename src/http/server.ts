import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import sequelize from '../database'
import { config } from '../env'
import { router } from './router'

const app = express()

// Configurar CORS
app.use(cors({
  credentials: true,
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(cookieParser())
app.use(express.json())

app.use(router)


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: err.errors 
    })
  }

  if (config.NODE_ENV !== 'prod') {
    console.error(err)
  }

  return res.status(500).json({ message: 'Internal server error' })
})

const PORT = config.PORT

app.listen(PORT,'0.0.0.0', () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})