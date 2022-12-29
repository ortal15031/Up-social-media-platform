import User from '../model/UserModel.js'
// const {promisify} =require('util');
import express from 'express'
const app=express();
import catchAsync from '../utilities/CatchAsync.js';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
app.use(cookieParser())
import ErrorHandling from '../utilities/ErrorHandling.js';
import bodyParser from 'body-parser';
import {promisify} from 'util';
import Post from '../model/PostModel.js';

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const generateToken=(id)=>{
    const token=jsonwebtoken.sign({id},process.env.JWT_SECRET,{ 
 expiresIn:"1h"

} )
return token;
}

export const generateCredentials=(res,user,statusCode)=>{
    const token=generateToken(user._id);
    const cookieOptions={
        onlyHttp:true,
  // secure:true,
  path: '/', 
  expires:new Date(Date.now()+10000*60)  //Will expires within an hour
    }
    res.cookie('jwt',token,cookieOptions);

     res.status(statusCode)
     .json({
      status:"success",
      token,
      data: user
      
    })
    
}

export const createUser=catchAsync(async (req,res,next)=>{

const {
  fullName,userName,email,password,confirmPassword,caption,profile}=req.body;
console.log("The user name"+fullName);
if(!fullName||!userName||!email||!password||!confirmPassword){
  return next(new ErrorHandling("One of the more are empty",404))
}
if(password!=confirmPassword){
  return next(new ErrorHandling("Both password fields does not equal",403)); 
}
if(await User.findOne({email}||await User.findOne({userName}))){
  return next(new ErrorHandling("The email you entered or user name already exists in the system",400));
 
}

  const newUser=await User.create({
    fullName,
    userName,
    email,
    password,
    confirmPassword,
    followers:[],
    following:[],
    caption,
    profile
    });
    console.log("newUser"+newUser);

res.status(201).json({
  status:"success",
  data:newUser
})
 
});

export const signUser=catchAsync(async(req,res,next)=>{

  const email=req.body.email;
  const password=req.body.password;
  if(!email||!password){
   return next(new ErrorHandling('You did not entered user name or password',404));
  }
  const user=await User.findOne({email}).select('+password');
  if(!user||!(await user.correctPassword(password,user.password))){
    return next(new ErrorHandling('User name or password are incorrect',400));
  }
  
  generateCredentials(res,user,200);

});

export const deleteCredentials=catchAsync(async(req,res,next)=>{
  res.clearCookie('jwt');
  res.status(200)
  .json({
   status:"success",
   data:"deleting cookie"
   
 })
})

export const updateUser=catchAsync(async(req,res,next)=>{
  const user=await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    // runValidators:true
    });
    if(!user){
      return(new ErrorHandling("User id does not exists",404));
    }
    console.log("userdfbdhfhf"+user);
    res.status(201).json({
        status:"success",
        data:{
            user
        }
    })

})

export const deleteUser=catchAsync(async(req,res,next)=>{
  const id=req.params.id;
  const posts=await Post.find({user:id});
  if(posts){
    await Post.deleteMan({user:id})
  }
  const deleteUser=await User.deleteOne({id});
  if(!deleteUser){
    return next(new ErrorHandling("The user you tried to remove does not exists",400));
  }
  res.status(200).json({
    status:"success",
    data:null
  })
})

export const protect=catchAsync(async(req,res,next)=>{
  console.log("The token is"+req.cookies.jwt);
  let token;
if(req.cookies.jwt){
   token=req.cookies.jwt;
}
console.log(token);
if(!token||token==''){
  return next(new ErrorHandling('Token is invalid or not exists',404));
}
console.log(jsonwebtoken.verify);

let verification=jsonwebtoken.verify(token,process.env.JWT_SECRET);

// let verification= await promisify(jsonwebtoken.verify)(token,process.env.JWT_SECRET);

const user=await User.findById(verification.id);
console.log(user);
if(!user){
  return next(new ErrorHandling('No user exists for this token',404))
}
// res.status(200).json({
//   status:"success"
// })
next();
});



