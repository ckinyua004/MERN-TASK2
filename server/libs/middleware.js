export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues please try again later."
    const { status, message, error } = err
    if(err){
        console.log(error)
    }
    res.status(status).json({ message: message || defaultMessage})
}