const User=require("../model/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(req.body);

    const isEmail=await User.findOne({email});

    if(isEmail){
        return res.status(400).json({message:"Email already exists"})
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    const token=jwt.sign({_id:user.id},process.env.JWT_SECRET_KEY)
    res.cookie("token",token)

    res.status(201).json({
        message:"User register successfully",
        user:{
            _id:user.id,
            name:user.name,
            email:user.email,
            password:user.password

        }
    })
}

const loginUser=async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const token=jwt.sign({_id:user.id},process.env.JWT_SECRET_KEY)
    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user.id,
            name:user.name,
            email:user.email
        }
    })

    console.log("User logged in successfully")

}

const logoutUser=(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully"})
}

module.exports={
    registerUser,
    loginUser,
    logoutUser
}

