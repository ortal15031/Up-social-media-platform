import Comment from "../model/CommentModel.js";
import express from 'express'
import Post from '../model/PostModel.js'
import ErrorHandlng from '../utilities/ErrorHandling.js';
const app=express();
// const bodyParser=require("body-parser");
import bodyParser from 'body-parser'
import catchAsync from '../utilities/CatchAsync.js'
import User from '../model/UserModel.js';

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

export const createComment=catchAsync(async(req,res,next)=>{
   const id=req.params.id;
   const _id=req.params._id;
const{comment,likes,dislikes}=req.body;

console.log("The is"+" "+id)
console.log("The comment is "+" "+req.body.comment);
const user=await User.findById(id);
const post=await Post.findOne({_id});
if(!user){
    return next(new ErrorHandlng("The user does not exists",400));
}

const newComment=await Comment.create({
user,
post,
comment,
likes,
dislikes
})
console.log(newComment);
res.status(201).json({
    status:"success",
    data:{
        newComment
    }
})
});

export const getAllComments=catchAsync(async(req,res,next)=>{
    const _id=req.params.id;
    const page=parseInt(req.query.page||"0");
    const PAGE_SIZE=20;
    const total=await Comment.countDocuments({});
    console.log("The id"+req.query.id)
    const post=await Post.findOne({_id});
    if(!post){
        return next(new ErrorHandlng("There are no comments for this post",400))
    }
    console.log("The ID"+" "+_id)
    console.log("The post is "+" "+post);
    const comments=await Comment.find({post}).limit(PAGE_SIZE).skip(PAGE_SIZE*page);
    if(!comments){
        return next(new ErrorHandlng("There are no comments available for this post",400));
    }
    res.status(200).json({
        status:"success",
        data:{
            comments,
            totalPages:Math.ceil(total/PAGE_SIZE)
        }
    })
});

export const addLike=catchAsync(async(req,res,next)=>{

    const comment = await Comment.find({_id: req.params.id, likes: req.params._id})
    if(comment.length > 0){
     return next(new ErrorHandlng("The user already liked this post",400));
    }
    const dislikeComment=await Comment.find({_id: req.params.id, dislikes: req.params._id});
    if(dislikeComment.length>0){
        await Comment.findOneAndUpdate({_id: req.params.id}, {
            $pull: {dislikes: req.params._id}
        }, {new: true})
    }
    await Comment.findOneAndUpdate({_id: req.params.id}, {
        $push: {likes: req.params._id}
    }, {new: true})
    const likesList= await Comment.find({}).select('likes -_id')
    // .limit(PAGE_SIZE).skip(PAGE_SIZE*page);;
   const data= likesList[2];
console.log("Theeee"+" "+likesList)
    res.status(200).json({
       status:'success',
       data
    })
   
})

export const addDislike=catchAsync(async(req,res,next)=>{
    const comment = await Comment.find({_id: req.params.id, dislikes: req.params._id})
    if(comment.length > 0){
     return next(new ErrorHandlng("The user already liked this post",400));
    }
    const likeComment=await Comment.find({_id: req.params.id, likes: req.params._id});
    if(likeComment.length>0){
        await Comment.findOneAndUpdate({_id: req.params.id}, {
            $pull: {likes: req.params._id}
        }, {new: true})
    }
    await Comment.findOneAndUpdate({_id: req.params.id}, {
        $push: {dislikes: req.params._id}
    }, {new: true})
    const dislikesList= await Comment.find({}).select('dislikes -_id')
    // .limit(PAGE_SIZE).skip(PAGE_SIZE*page);;
   const data= dislikesList[2];
    res.status(200).json({
       status:'success',
       data
    }) 
   
})


export const sendLikeList=catchAsync(async(req,res,next)=>{
    const commentLikes=await Comment.find({_id:req.params.id}).select('likes -_id');
    if(commentLikes.length<0){
        return next(new ErrorHandlng("Comment list is empty",400));
    }
    const likeList= commentLikes[2];

    res.status(200).json({
        status:'success',
        data:{
            likeList
        }
    })
})

export const sendDislikeList=catchAsync(async(req,res,next)=>{
    const commentDislikes=await Comment.find({_id:req.params.id}).select('dislikes -_id');
    if(commentDislikes.length<0){
        return next(new ErrorHandlng("Comment list is empty",400));
    }
    const dislikeList= commentDislikes[2];

    res.status(200).json({
        status:'success',
        data:{
            dislikeList
        }
    })
})