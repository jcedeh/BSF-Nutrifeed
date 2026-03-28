export const errorHandler = (err, req, res, next)=>{
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const value = err.keyValue[field];
        err.statusCode = 409;
        err.status = 'fail';
        err.message = `${field} "${value}" already exists`;
    }
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}