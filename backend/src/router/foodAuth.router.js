const express=require("express")

const foodController=require("../controller/food.controller")

const router=express.Router()

router.post("/register",foodController.foodRegister)
router.post("/login",foodController.foodLogin)
router.get("/logout",foodController.foodLogout)

module.exports=router