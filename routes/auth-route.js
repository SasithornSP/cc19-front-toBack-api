const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const { registerSchema, loginSchema, validateWithZod } = require("../Middlewares/validators");


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema),authController.register);
router.post("/login",validateWithZod(loginSchema), authController.login);

module.exports = router;
