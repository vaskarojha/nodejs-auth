const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.send("Access Denied");
    
    try{
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified;
    next()
    }catch(error){
        res.status(401).send('invalid token');
    }
};
