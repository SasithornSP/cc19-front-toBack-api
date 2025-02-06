//1.List all users
//2.Update Role
//3.Delete User

const prisma = require("../configs/prisma");

exports.listUsers = async(req,response,next)=>{
    try {
        const users =await prisma.profile.findMany({
            // omit คือที่ไม่เอา
            omit:{
                password:true,
            }
        })
        console.log(users);
        response.json({result:users})
    } catch (error) {
        next(error)
    }
}

exports.updateRole = async(req,response,next)=>{
    try {
        const{id,role}=req.body
        console.log(id,role);
        // console.log(typeof id);
        const update = await prisma.profile.update({
            where:{id:Number(id)},
            data:{role:role}
        })
        response.json({message:"Update Success"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req,response,next)=>{
    try {
        const {id}=req.params
        const deleted =await prisma.profile.delete({
            where:{id: Number(id),}
        })
        console.log(id);
        response.json({message:"Delete Success"})
    } catch (error) {
        next(error)
    }
}