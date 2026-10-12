const express=require("express")

const router=express.Router()
const authMiddleware=require("../middleware/auth.middleware")
const foodPartnerController=require("../controller/food-partner.controller")

router.get('/:id',authMiddleware.userAuthMiddleware,foodPartnerController.getFoodPartnerById)

module.exports=router;