exports.register=(req,resp,next)=>{
try {
    resp.json({message:"hello register"})
} catch (error) {
    console.log(error);
    resp.status(500).json({message:"Server Error!!"})
}
};

