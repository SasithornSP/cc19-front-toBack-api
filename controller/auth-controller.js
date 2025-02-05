const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
//-----------------------------------------------------------------------------------------
exports.login = async(req,resp,next)=>{
    try {
        //step 1 req.body
        const {email,password} = req.body

        //step 2 Check email and password
        const profile =await prisma.profile.findFirst({
            where:{
                email:email,
            }
        })
        if(!profile){
            return createError(400,"Email,password is invalid")
        }
        const isMatch =bcrypt.compareSync(password,profile.password)
        if(!isMatch){
            return createError(400,"Email,password is invalid")
        }
        //step 3 Generate token
        const payload ={
            id:profile.id,
            email:profile.email,
            firstname:profile.firstname,
            lastname:profile.lastname,
            role:profile.role
        }
        const token = jwt.sign(payload,process.env.SECRET,{
            expiresIn:"1d"
        })
        // console.log(token);
        // console.log(payload);
        //step 4 Response
        resp.json({message:"Login success",
            payload:payload,
            token:token
        });
    } catch (error) {
        next(error)
        resp.status(500).json({message:"Server Error!!"})
    }
};