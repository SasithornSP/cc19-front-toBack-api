const createError = require("../utils/createError");
const jwt =require("jsonwebtoken")

//ใช้verify token
exports.authCheck =async(req,response,next)=>{
    try {
        //รับ header จาก client
        const authorization =req.headers.authorization
        //check ถ้าไม่มีToken
        console.log(authorization);
        if(!authorization){
            return createError(400,"Missing Token!!!")
        }
        //Bearer token.......ใช้ .slit แบ่งด้วยช่องว่าง
        const token =authorization.split(" ")[1]

        //verify token
        jwt.verify(token,process.env.SECRET,(err,decode)=>{
            if(err){
                return createError(401,"Unauthorized !!")
            }
            // สร้าง property user =decode (ข้อมูล user จาก token)
            req.user = decode
            console.log(req);
            next()
        })
    } catch (error) {
        next(error)
    }
}