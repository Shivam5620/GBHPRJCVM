import express  from "express";
import colors from "colors";
import  dotenv from "dotenv";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import authRoute from './routes/authRoute.js'
const app =express()

// configure env
dotenv.config()

// database config\
ConnectDB()

// morgan middelwares
app.use(express.json())
app.use(morgan('dev'))

// all routes
app.use('/api/v1/auth',authRoute)


// rest API

app.get('/',(req,res)=>{
    res.send(
    `<h1>Welcome to Ecommerce page</h1>`    
    )
})

const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running  ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})