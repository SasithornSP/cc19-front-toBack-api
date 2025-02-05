const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")

exports.register=async(req,resp,next)=>{
try {
    //step 1 req.body
    const {email,firstname,lastname,password,confirmpassword} = req.body
    
    //step 2 validate ใน validator.js
  
    //step 3 Check already

    const CheckEmail = await prisma.profile.findFirst({
        where:{
            email:email,
        }
    })
    console.log(CheckEmail);
    if(CheckEmail){
        return createError(400,"Email is alread exits!!")
    }
    //step 4 Encrypt bcrypt
    // const salt =bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,10)
    // console.log(hashedPassword);

    //step 5 Insert to DB
    const profile =await prisma.profile.create({
        data:{
            email:email,
            firstname:firstname,
            lastname:lastname,
            password:hashedPassword,
        }
    })
    //step 6 Response
    resp.json({message:"Register success"})
} catch (error) {
    console.log("stap 002 catch");
    next(error)
}
};

exports.login = (req,resp,next)=>{
    try {
        resp.json({message:"hello Login"})
    } catch (error) {
        next(error)
        resp.status(500).json({message:"Server Error!!"})
    }
};