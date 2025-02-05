const express = require("express");
const router = express.Router();
const userController =require("../controller/user-controller")

//@ENDPOINT http://localhost:8000/api/users
router.get("/users",userController.listUsers)
router.patch("/user/update-role",userController.updateRole)
router.delete("/user/:id",userController.deleteUser)



module.exports= router