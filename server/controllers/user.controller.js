import { Collection, ObjectId, ReturnDocument } from 'mongodb'

export const getUser = async(req, res, next) => {
    try{
        const query = { _id: new ObjectId(req.params.id)}
        const user = await collection.findOne(query)

        if(!user){
            return next({status : 404, message: 'User not found'})
        }

        res.status(200).json(user)
        } catch(err) {
            next({status: 500, err})
        }
}

export const updateUser = async(req, res, next) => {
    try{
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const query = { _id: new ObjectId(req.params.id)}
        const data = {
            $set: {
                ...req.body,
                updatedAt: new Date().toISOString()
            },
        }
        const options = {
            ReturnDocument: 'after'
        }
        const updatedUser = await Collection.findOneAndUpdate(query, data, options)
        const { password: pass, updatedAt, createdAt, ...rest } = updatedUser
        res.status(200).json(updateUser)
    } catch(err) {
        next({status: 500, err})
    }
}

export const deleteUser = async( req, res) => {
    try{
        const query = { _id: new ObjectId(req.params.id)}
        await Collection.deleteOne(query)
        res.status(200).json({ message: 'User Has been deleted.'})
    } catch(err){
        next({status: 500, err})
    }
}