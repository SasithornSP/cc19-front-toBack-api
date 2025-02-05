const express = require("express")
const router =express.Router()
const authController= require("../controller/auth-controller")
const {z}  =require("zod")

//Test validator
const registerSchema =z.object({
    email:z.string().email("Email ไม่ถูกต้อง"),
    firstname:z.string().min(3,"Firstname ต้องมากกว่า 3 "),
    lastname:z.string().min(3,"Lastname ต้องมากกว่า 3 "),
    password:z.string().min(6,"Password ต้องมากกว่า 6 "),
    confirmpassword:z.string().min(6,"confirmPassword ต้องมากกว่า 6 ")
}).refine((data)=>data.password === data.confirmpassword,{
    message:"password incorrect",
    path:["confirmPassword"]
})

const validateWithZod =(schema)=>(req,resp,next)=>{
    try {
        console.log("hello middleware");
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error.errors);
        next(error)
    }
}


//@ENDPOINT http://localhost:8000/api/register
router.post("/register",validateWithZod(registerSchema),authController.register)
router.post("/login",authController.login)

module.exports=router