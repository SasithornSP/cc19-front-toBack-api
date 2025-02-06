# Server

## Step 1 create package
```bash
npm init -y
```

## Step 2 install package...
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma 
npx prisma init
```

## Step 3 Git
```bash
git init
git add . 
git commit -m "message"
```

next Step
cody code from repo
only first time

## Step 4 copy from repo
```bash
git remote add origin https://github.com/SasithornSP/cc19-front-toBack-api.git
git branch -M main
git push -u origin main
```

When update code
```bash
git add . 
git commit -m "message"
git push
```
## Step 5 update package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"nodemon index.js"
  },
```
and code use middlewares
```js
const express = require("express")
const cors =require("cors")
const morgan =require("morgan")
const app =express()


//Middlewares
app.use(cors()) //Allows cross domain
app.use(morgan("dev")) //show log terminal
app.use(express.json()) //For read json



//start server
const PORT = 8000
app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));
```

## Step 6 create auth-route [Register]
```js
const express = require("express")
const router =express.Router()

router.post("/register")

module.exports=router
```

## Step 7 create auth-controller [register+login]
```js
exports.register=(req,resp,next)=>{
try {
    resp.json({message:"hello Register"})
} catch (error) {
    console.log(error);
    resp.status(500).json({message:"Server Error!!"})
}
};

exports.login = (req,resp,next)=>{
    try {
        resp.json({message:"hello Login"})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"Server Error!!"})
    }
};
```

## update auth-route [Register]
```js
const express = require("express")
const router =express.Router()
const authController= require("../controller/auth-controller")

//@ENDPOINT http://localhost:8000/api/register
router.post("/register",authController.register)

module.exports=router
```


## Step 7 update index
```js

const express = require("express")
const cors =require("cors")
const morgan =require("morgan")

//Routing
const authRouter =require("./routes/auth-route")

const app =express()


//Middlewares
app.use(cors()) //Allows cross domain
app.use(morgan("dev")) //show log terminal
app.use(express.json()) //For read json

//Routing
app.use("/api",authRouter)

//start server
const PORT = 8000
app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));
```

## Step 8 create handlerError [error.js]  sameToCopyTo
```js
const handlerError = (err, req, resp, next) => {
  console.log(err);
  resp.status(err.statusCode || 500).json({ message: err.message || "Internal server error" });
};

module.exports = handlerError;
```

## Step 10 update next(error)
```js
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
```
## Step 10 update index
```js
แล้วก็ นำเข้าไป index
const handlerError =require("./Middlewares/error")
```
```js
และ เรียกใช้
//handle error
app.use(handlerError)
```

## Step 11 create not-found [not-found.js] sameToCopyTo
```js
const notFound = (req, res) => {
  res.status(404).json({ message: "Resource not found on this server" });
};

module.exports = notFound;
```


## Step 12 update index
```js
แล้วก็ นำเข้าไป index
const notFound =require("./Middlewares/not-found")
และ เรียกใช้
app.use(notFound)
```
# ไปเช็คที่ post man 
```bash
สร้างไฟล์ register+login
เลือก medthod post ใส่ http://localhost:8000/api/register
เลือก body raw เเล้วพิม
{
    "email":"a@gmail.com",
    "firstname":"aom",
    "lastname":"Sp",
    "password":"123456",
    "confirmpassword":"123456"
}
```
## Step 13 createError [ createError.js ในFolder utils]
```js
const createError = (code, message) => {
  console.log("step1 create Error");
  const error = new Error(message);
  error.statusCode = code ;
  throw error
};

module.exports = createError;
```

## Step 14 validate with zod 

/middlewares/validator.js

```js
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
```
## Step 15 update auth-route [auth-route.js] +เพิ่ม current-user
```js
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const { registerSchema, loginSchema, validateWithZod } = require("../Middlewares/validators");


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema),authController.register);
router.post("/login",validateWithZod(loginSchema), authController.login);
//เพิ่ม current-user
router.get("/current-user", authController.currentUser)
module.exports = router;
```

## Step 16 ไปเปลี่ยนที่ .env เพิ่ม model
```js
DATABASE_URL="mysql://root:78963@localhost:3306/landmark"
```

## Step 13 ไปเปลี่ยนที่ scheme.prisma
```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Profile {
  id        Int      @id @default(autoincrement())
  email     String
  firstname String
  lastname  String
  role      Role     @default(USER)
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}

```
## Step 13 connect to mysql workbenc
```js
npx prisma migrate dev --name init
```

# Step 14 create prisma.js ในFolder configs คือการเขียนconnect databese
```js
const {PrismaClient} =require("@prisma/client")

const prisma = new PrismaClient()


module.exports=prisma
```

## Step 15 updateCode_Register ใน auth-controller.js
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")

exports.register=async(req,resp,next)=>{
try {
    //step 1 req.body
    const {email,firstname,lastname,password,confirmpassword} = req.body
    
    //step 2 validate ใน validator.js
  
    //step 3 Check already

    const CheckEmail = await prisma.profile.findFirst({
        where:{
            email:email,
        }
    })
    console.log(CheckEmail);
    if(CheckEmail){
        return createError(400,"Email is alread exits!!")
    }
    //step 4 Encrypt bcrypt
    // const salt =bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,10)
    // console.log(hashedPassword);

    //step 5 Insert to DB
    const profile =await prisma.profile.create({
        data:{
            email:email,
            firstname:firstname,
            lastname:lastname,
            password:hashedPassword,
        }
    })
    //step 6 Response
    resp.json({message:"Register success"})
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
```

## Step 16 update_Login ใน auth-controller.js
ไปเพิ่ม SECRET = cc19 ใน .env
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//-------------------------------------------------------------
exports.login = async(req,resp,next)=>{
    try {
        //step 1 req.body
        const {email,password} = req.body

        //step 2 Check email and password
        const profile =await prisma.profile.findFirst({
            where:{
                email:email,
            }
        })
        if(!profile){
            return createError(400,"Email,password is invalid")
        }
        const isMatch =bcrypt.compareSync(password,profile.password)
        if(!isMatch){
            return createError(400,"Email,password is invalid")
        }
        //step 3 Generate token
        const payload ={
            id:profile.id,
            email:profile.email,
            firstname:profile.firstname,
            lastname:profile.lastname,
            role:profile.role
        }
        const token = jwt.sign(payload,process.env.SECRET,{
            expiresIn:"1d"
        })
        // console.log(token);
        // console.log(payload);
        //step 4 Response
        resp.json({message:"Login success",
            payload:payload,
            token:token
        });
    } catch (error) {
        next(error)
        resp.status(500).json({message:"Server Error!!"})
    }
};
//เพิ่ม currentUser 
exports.currentUser = async (req,resp,next)=>{
    try {
        resp.json({message:"Hello,current user"})
    } catch (error) {
        next(error)
    }
}
```

## Step 17 create user-controller ใน Forder controller
```js
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
```

## Step 18 create user-route  ใน Forder route
```js
const express = require("express");
const router = express.Router();
const userController =require("../controller/user-controller")

//@ENDPOINT http://localhost:8000/api/users
router.get("/users",userController.listUsers)
router.patch("/user/update-role",userController.updateRole)
router.delete("/user/:id",userController.deleteUser)



module.exports= router
```
## Step 19 update_index.js  update_ userRouter
```js

const express = require("express")
const cors =require("cors")
const morgan =require("morgan")
const handlerError =require("./Middlewares/error")
const notFound =require("./Middlewares/not-found")
//Routing
const authRouter =require("./routes/auth-route")
const userRouter =require("./routes/user-route")
const app =express()


//Middlewares
app.use(cors()) //Allows cross domain
app.use(morgan("dev")) //show log terminal
app.use(express.json()) //For read json

//Routing
app.use("/api",authRouter)

//Routing-user
app.use("/api",userRouter)


//handle error
app.use(handlerError)
app.use(notFound)

//start server
const PORT = 8000
app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));

```


//---------------------------------------------------------------------------
## Step 20 create auth-middleware ใน Forder middleware
```js
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

```

## Step 21 update auth-route.js
```js
เพิ่ม
//middleware
const {authCheck}=require("../Middlewares/auth-middleware")

router.get("/current-user", authCheck,authController.currentUser)
```

## Step 22 update User-controller.js
```js
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
```

## Step 23 update user-route.js
```js
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
```


## Step 24
```js

```
## Step 23
```js

```

