const createError = require("../utils/createError");

exports.register=(req,resp,next)=>{
try {
    //step 1 req.body
    const {email,firstname,lastname,password,confirmpassword} = req.body
    
    //step 2 validate
    if (!email){
        return createError(400,"Email is require")
    }
    if (!firstname){
        return createError(400,"firstname is require")
    }
    //step 3 Check already
    //step 4 Encrypt bcrypt
    //step 5 Insert to Db
    //step 6 Response
    resp.json({message:"hello Register"})
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