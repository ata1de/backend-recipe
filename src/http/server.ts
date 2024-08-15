import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import sequelize from '../database'
import { router } from './router'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(router)

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const PORT = process.env.port || 3333

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})