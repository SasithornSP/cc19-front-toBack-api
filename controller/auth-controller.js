
exports.register=(req,resp,next)=>{
try {
    resp.json({message:"hello Register"})
} catch (error) {
    next(error)
    resp.status(500).json({message:"Server Error!!"})
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