import express from 'express'
import 'dotenv/config'
import userRouter from './routes/user.route.js'
import { errorHandler } from './libs/middleware.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use(errorHandler)

app.use('api/v1/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})