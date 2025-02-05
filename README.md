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

## Step 7 create auth-controller
```js
exports.register=(req,resp,next)=>{
try {
    resp.json({message:"hello register"})
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