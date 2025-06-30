import express from 'express'
import 'dotenv/config'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.router.js'
import { errorHandler } from './libs/middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const PORT = 8000

app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})