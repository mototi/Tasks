
export const validatePost = (req , res , next) => {
    const {title , price ,description, categoryId, images} = req.body || {}
    const keys = Object.keys( req.body )
    if (title && price && description && categoryId && images && keys.length == 5){
        next();
    }else{
        res.status(400);
        res.end();
    }
}