//1.List all users
//2.Update Role
//3.Delete User

exports.listUsers = async(req,response,next)=>{
    try {
        response.json({message:"Hello,List users"})
    } catch (error) {
        next(error)
    }
}

exports.updateRole = async(req,response,next)=>{
    try {
        response.json({message:"Hello,Update Role"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req,response,next)=>{
    try {
        response.json({message:"Hello,Delete User"})
    } catch (error) {
        next(error)
    }
}