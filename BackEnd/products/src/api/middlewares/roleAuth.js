
module.exports = (roles) => {
    return (req, res, next) => {

        const user = req.user;
        
        if(!user || !roles.includes(user.permission)){
            return res.status(403).json({message: 'No Permission'})
        }
        
        return next();
        
    }
}