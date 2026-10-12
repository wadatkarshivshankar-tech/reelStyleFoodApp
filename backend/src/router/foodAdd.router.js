const express=require("express")
const multer=require("multer")


const authMiddleware=require("../middleware/auth.middleware")
const foodAddController=require("../controller/foodAdd.controller")
const router=express.Router()

const upload=multer({
    storage:multer.memoryStorage(),

})

router.post("/add",authMiddleware.authMiddleware,upload.single("video"),foodAddController.foodAdd)
//Api of Home   /api/foodAdd/
router.get("/",authMiddleware.userAuthMiddleware,foodAddController.foodGet)

router.post("/like",authMiddleware.userAuthMiddleware,foodAddController.likeFood)


router.post("/save",authMiddleware.userAuthMiddleware,foodAddController.saveVideo)




module.exports=router