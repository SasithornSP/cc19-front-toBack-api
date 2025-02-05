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

## Step 14 update auth-cotroller
```js

```

## Step 15  update auth-route [zod]
```js
//Test validator
const validateWithZod =()=>(req,resp,next)=>{
    try {
        console.log("hello middleware");
        next()
    } catch (error) {
        next(error)
    }
}
```
## Step 13 
```js

```

