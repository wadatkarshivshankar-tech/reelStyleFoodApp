const storageService=require('../service/storage.service.js');
const foodModel=require("../model/foodModel.js")
const likeModel=require("../model/likes.Model.js")
const saveModel=require("../model/save.model.js")
const{v4:uuid}=require("uuid")

const foodAdd=async(req,res)=>{

    // console.log(req.foodPartner)
    // console.log(req.file)
    // console.log(req.body)

    // console.log("4. Starting ImageKit upload...");


    const fileUpload=await storageService.uploadFile(req.file.buffer,uuid())
    console.log(fileUpload)

    // console.log("5. ImageKit upload completed!");

    const food=await foodModel.create({
        name:req.body.name,
        video:fileUpload.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })
    
    res.status(200).json({
        message:"Food added successfully",
        food
    })

}



const foodGet=async(req,res)=>{

    try{
        const foods=await foodModel.find({})
        res.status(200).json({
            message:"Foods fetched successfully",
            foods
        })
       
    }
    catch(err){
        res.status(500).json({
            message:"Error in getting food",
            error:err.message
        })
    }

}

const likeFood=async (req, res)=>{
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })
} 

const saveVideo=async(req,res)=>{
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })
}


module.exports={
    foodAdd,
    foodGet,
    likeFood,
    saveVideo
}