import User from   '../model/UserModel.js';
import express from 'express'
const app=express();
import catchAsync from '../utilities/CatchAsync.js';
import ErrorHandlng from '../utilities/ErrorHandling.js';


export const getAllUsers=catchAsync(async(req,res,next)=>{
   const page=parseInt(req.query.page||"0");
   const PAGE_SIZE=20;
   const total=await User.countDocuments({});
    const allUsers=await User.find().limit(PAGE_SIZE).skip(PAGE_SIZE*page);
    res.status(200).json({
         status:"success",
         data:{
            totalPages:Math.ceil(total/PAGE_SIZE),
            allUsers
         }
    })
});

export const getUsersByName=catchAsync(async(req,res,next)=>{
   const data=req.query.keyword;
   console.log("The user name"+data);
   const page=parseInt(req.query.page||"0");
   const PAGE_SIZE=20;
   const query=new RegExp(data,'i');
   const total=await User.countDocuments({$or:[{userName:query},
      {fullName:query}]});
   const users=await User.find({$or:[{userName:query},
   {fullName:query}]}).limit(PAGE_SIZE).skip(PAGE_SIZE*page);  
    if(!users){
      return next(new ErrorHandlng("No user with this user name exists",400));
   }
   res.status(200).json({
      status:"success",
      data:{
         totalPages:Math.ceil(total/PAGE_SIZE),
         users
      }
   })
})

export const getProfile=catchAsync(async(req,res,next)=>{
   const id=req.params.email;
    const user=await User.findOne(id);
    if(!user){
        return next(ErrorHandlng("Useris not exists",404));
    }
    res.status(200).json({
    status:"success",
    data:{
       user
    }
  })
});

export const getUserDetails=catchAsync(async(req,res,next)=>{
   const id=req.params.id;
   const user=await User.findById(id);
   console.log("The user is"+user);
   if(!user){
      return next(new ErrorHandlng("The user soes not exists",404));
   }
   res.status(200).json({
      status:"success",
      data:{
         user
      }
   })
});



export const follow=catchAsync(async(req,res,next)=>{
   const follower=await User.find({id:req.params.id});
   const followed=await User.find({id:req.params._id});
   if(!followed){
      return next(new ErrorHandlng("The user does not exists anymore",400));
   }
   await Post.findOneAndUpdate({_id: req.params._id}, {
      $push: {followers: req.params.id}
  }, {new: true})
  await Post.findOneAndUpdate({_id: req.params._id}, {
   $push: {following: req.params.id}
}, {new: true})

res.status(200).json({
   status:"success"
})
})

export const isFollower=catchAsync(async(req,res,next)=>{
   const follower=await User.find({id:req.params._id, followers:req.params.id});
   if(follower.length<0){
      return next(new ErrorHandlng("you are not following the user"));
   }

   res.status(200).json({
      status:"success"
   })
})




