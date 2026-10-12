const FoodPartner=require('../model/foodPartner.model.js')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')

const foodRegister=async(req,res)=>{

    const{name,contactName,phone,address,email,password}=req.body;
    // console.log(req.body)

    const isEmail=await FoodPartner.findOne({email})

    if(isEmail){
        return res.status(401).json({
            message:"email already exists"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const foodPartner=await FoodPartner.create({
        name,
        contactName,
        phone,
        address,
        email,
        password:hashedPassword
    })

    const token=jwt.sign({_id:foodPartner.id},process.env.JWT_SECRET_KEY)
    res.cookie("token",token)
    res.status(201).json({
        message:"Food partner registered successfully",
        foodPartner
    })

}

const foodLogin=async(req,res)=>{
    const{email,password}=req.body;

    const foodPartner=await FoodPartner.findOne({email})
    
    if(!foodPartner){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const isMatch=await bcrypt.compare(password,foodPartner.password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const token=jwt.sign({_id:foodPartner.id},process.env.JWT_SECRET_KEY)
    res.cookie("token",token)
    
    res.status(200).json({
        message:"Food partner logged in successfully",
        foodPartner
    })
}

const foodLogout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Food partner logged out successfully"
    })
}

module.exports={
    foodRegister,
    foodLogin,
    foodLogout  
}
