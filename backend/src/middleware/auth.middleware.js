const foodPartner=require("../model/foodPartner.model")
const userModel=require("../model/user.model")
const jwt=require("jsonwebtoken");


//foodPartner middleware
const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const partnerId=await foodPartner.findById(decoded._id);

        req.foodPartner=partnerId
    }
    catch(err){
        return res.status(401).json({
            message:"error occur in jwt token"
        })
    }

    next()    
}

//user middleware

const userAuthMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;

    // console.log("USER MIDDLEWARE HIT");
    // console.log("Token exists:", !!token);


    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await userModel.findById(decoded._id);

        // console.log("DECODED JWT:", decoded);


        req.user=user
    }
    catch(err){

        console.log("USER AUTH ERROR:", err);
        return res.status(401).json({
            message:"error occur in jwt token"
        })
    }

    next()    
}

module.exports={
    authMiddleware,
    userAuthMiddleware
}