
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
