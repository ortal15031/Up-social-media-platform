// import express from 'express'
import superagent from 'superagent'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import postRoute from './routes/PostRoute.js'
import authRoute from './routes/AuthRoute.js'
import userRoute from './routes/UserRoute.js'
import commentRoute from './routes/CommentRoute.js'
import bodyParser from 'body-parser'
const app=express();
app.use(cors( {credentials:true,origin:'http://localhost:3000'} ))
app.use(cookieParser());


dotenv.config({path:'./config.env'})
import ErrorHandling from './utilities/ErrorHandling.js'
import ErrorController from './controllers/ErrorController.js'
// app.use(express.static(``))


let database=process.env.DATABASE;
const port= process.env.PORT||5000
database=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);



app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

let conn=mongoose.connect(database,{
 
    useNewUrlParser: true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    useUnifiedTopology: true
        
}).then(data=>{
    if(data){
        console.log("Successfully connected to server");
    }
    else{
        throw new Error("Unable to connect");
    }
}).catch(err=>{
    console.log(err.message);
})

app.use('/post',postRoute);
app.use('/user',userRoute);
app.use('/authentication',authRoute);
app.use('/comment',commentRoute);
app.all('*',(req,res,next)=>{
    next(new ErrorHandling("Can't find results check if path is valid",404));
})
app.use(ErrorController)

app.listen(port,()=>{
console.log(`Listening to port ${port}`);
})


