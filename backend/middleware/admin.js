const adminOnly= (req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();
    }else{
        res.status(403).json({message: "You are not authorised :("});
    }
}

module.exports= adminOnly;