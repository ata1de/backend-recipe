import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
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


const PORT = config.PORT

app.listen(PORT,'0.0.0.0', () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})