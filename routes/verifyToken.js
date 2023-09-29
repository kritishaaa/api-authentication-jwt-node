const jwt = require('jsonwebtoken');

module.exports =function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied");

    try {
        const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user= verifyToken;
        next();
        
    } catch (error) {
        return res.status(400).send("invalid token");   
    }

}