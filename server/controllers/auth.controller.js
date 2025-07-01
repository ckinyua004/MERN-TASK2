import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../libs/dbConnect.js'

const collection = await db.collection('users')

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        // Check if the email or username already exists
        const query = {
            $or: [{ email }, { username }],
        }
        const existingUser = await collection.findOne(query)
        if (existingUser) {
            return next({
                status: 422,
                message: 'Email or Username is already registered'
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user object
        const user = {
            username,
            email,
            password: hashedPassword,
            avatar: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        // Insert the user into the database
        const result = await collection.insertOne(user)

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertedId, email, username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '7d' }
        )

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertedId,
                username,
                email,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        })

    } catch (error) {
        next({ status: 500, message: 'Internal server error', error })
    }
}

export const signin = async(req, res) => {
    const { email, password } = req.body
    try{
        const validUser = await collection.findOne({ email })
        if (!validUser) {
            return next({ status: 404, message: 'User Not Found! '})
        }
        const validPassword = await bcrypt.compare(password, validUser.password)
        if (!validPassword){
            return next({ status: 401, message: 'Wrong credentials'})
        }
        const token = jwt.sign({ id: validUser._id}, process.env.AUTH_SECRET)
        const { password: pass, updatedAt, createdAt, ...rest } = validUser
        res
            .cookie('taskly_token', token, { httpOnly: true})
            .status(200)
            .json(rest)
    } catch(error){
        next({ status: 500, error})
    }
}

export const signout = async(req, res, next) => {
    try {
        res.clearCookie('taskly_token')
        res.status(200).json({ message: 'Sign Out Successful.'})
    } catch (error) {
        next({status: 500 })
    }
}