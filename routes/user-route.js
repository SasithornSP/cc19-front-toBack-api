const express = require("express");
const router = express.Router();
const userController =require("../controller/user-controller")

//import middleware
const {authCheck}=require("../Middlewares/auth-middleware")

//@ENDPOINT http://localhost:8000/api/users
router.get("/users",authCheck,userController.listUsers)
router.patch("/user/update-role",authCheck,userController.updateRole)
router.delete("/user/:id",authCheck,userController.deleteUser)



module.exports= router