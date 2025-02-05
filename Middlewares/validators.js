const { z } = require("zod");

//Test validator
exports.registerSchema = z.object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 "),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า 3 "),
    password: z.string().min(6, "Password ต้องมากกว่า 6 "),
    confirmpassword: z.string().min(6, "confirmPassword ต้องมากกว่า 6 "),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "password incorrect",
    path: ["confirmPassword"],
  });

exports.loginSchema = z.object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 ")
  })
  

exports.validateWithZod = (schema) => (req, resp, next) => {
  try {
    console.log("hello middleware");
    schema.parse(req.body);
    next();
  } catch (error) {
    const errMsg = error.errors.map((el) => el.message);
    const errTxt = errMsg.join(",");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};