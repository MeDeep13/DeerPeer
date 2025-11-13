const NotLoggedIn= (req,res,next)=>{
    const authHeader= req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        return res.status(400).json({message: "Already logged in. Logout to continue"})
    }
    next();
}

module.exports= {NotLoggedIn};