import express from 'express'
import sequelize from './database'
import { router } from './router'

const app = express()

app.use(express.json())

app.use(router)


const PORT = process.env.port || 3333

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})