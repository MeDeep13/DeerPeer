const jwt= require('jsonwebtoken');

const validateToken= (req,res, next)=>{
    let token;
    const authHeader= req.headers.authorization || req.headers.Authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "Token is missing or malformed!"});
    }
        token= authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err,decode)=>{
            if(err){
                res.status(400);
                throw new Error("User is unauthorised")
            }
            req.user= decode.user;
            
            next();
        })
    
}

module.exports= {validateToken};