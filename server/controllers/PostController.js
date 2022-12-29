import express, { urlencoded } from 'express';
const app=express();
import Post from '../model/PostModel.js'
import ErrorHandlng from '../utilities/ErrorHandling.js';
import bodyParser from 'body-parser'
import catchAsync from '../utilities/CatchAsync.js'
import User from '../model/UserModel.js';
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

    export const createPost=catchAsync(async(req,res,next)=>{
        const user=req.params.id;
        const{title,content,category,thumbnail,createdAt}=req.body;
        if(!title||!content||!category||!user){
            return next(new ErrorHandlng("One or more of the details is missing",400))
        }
        const userDetailed=await User.findById(user);
        if(!userDetailed){
            return next(new ErrorHandlng("User does not exists",403));
        }

        const post=await Post.create({
            title,
            content,
            user:userDetailed,
            category,
            thumbnail,
            createdAt
        });
         res.status(201).json({
            status:"success",
            data:{
                post
            }
         })
    });


   export const getUserPosts=catchAsync(async(req,res,next)=>{
    const user=req.query.id;
    console.log("The user id is"+""+user);
    const page=parseInt(req.query.page||"0");
    const PAGE_SIZE=20;
    const total=await Post.countDocuments({});
        const userPosts=await Post.find({user})
        .limit(PAGE_SIZE).skip(PAGE_SIZE*page);
        const self=await User.findOne({id:user})
        if(!userPosts){
            return next(new ErrorHandlng("There is no posts for this user",404))
        }
        if(!self){
            return next(new ErrorHandlng("There is no user with those details"));
        }
        res.status(200).json({
            status:"success",
            data:{
                totalPages:Math.ceil(total/PAGE_SIZE),
                userPosts
                
            }
        })
    })
    

export const getAllPosts=catchAsync(async(req,res,next)=>{
    const page=parseInt(req.query.page||"0");
    const PAGE_SIZE=20;
    const total=await Post.countDocuments({});
    const posts=await Post.find().limit(PAGE_SIZE).skip(PAGE_SIZE*page);
    if(!posts){
        return next(new ErrorHandlng("There are no posts available",400));
    }
    res.status(200).json({
        status:"success",
        data:{
            totalPages:Math.ceil(total/PAGE_SIZE),
            posts
        }
    })
})
export const getPosts=catchAsync(async(req,res,next)=>{
    const data=req.query.keyword;
    console.log("The datattata"+''+data);
    const page=parseInt(req.query.page||"0");
    const PAGE_SIZE=20;
    const query=new RegExp(data,'i');
    const total=await Post.countDocuments({$or:[{title:query},{content:query}]});
const posts=await Post.find({$or:[{title:query},{content:query}]}).limit(PAGE_SIZE).skip(PAGE_SIZE*page);
if(!posts){
    return next(new ErrorHandlng("No posts were found",400))
}
res.status(200).json({
    status:"success",
    data:{
        totalPages:Math.ceil(total/PAGE_SIZE),
        posts
    }
})
})

export const getPostsByCategory=catchAsync(async(req,res,next)=>{
    const category=req.params.category;
    const page=parseInt(req.query.page||"0");
    const PAGE_SIZE=20;
    const total=await Post.countDocuments({});
    const posts=await Post.find({category}).limit(PAGE_SIZE).skip(PAGE_SIZE*page);;
    if(!posts){
        return next(new ErrorHandlng("There is no posts in this category yet",400));
    }
    res.status(200).json({
        status:"success",
        data:{
            posts,
            totalPages:Math.ceil(total/PAGE_SIZE)

        }
    })
})

export const updatePost=catchAsync(async(req,res,next)=>{
    console.log("The usr id issssss"+" "+req.params.id);
    console.log("The user data isssss"+" "+req.body);

    const{title,content,category,thumbnail,createdAt}=req.body;
    console.log("The user tit isssss"+" "+title);

    const updatedPost = {
        title,
        content,
        category,
        thumbnail,
        createdAt
      };
      console.log("The title is "+title);
      const post=await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    //   await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });
    // const post=await Post.findByIdAndUpdate(req.query.id,req.query.data,{
    //   new:true,
    //   // runValidators:true
    //   });
      if(!post){
        return next(new ErrorHandlng("Post id does not exists",404));
      }
      console.log("userdfbdhfhf"+post);
      res.status(201).json({
          status:"success",
          data:{
              post
          }
      })
  })

  export const deletePost=catchAsync(async(req,res,next)=>{
    // const id=req.params._id;
    const postId=req.params._id;
    const id= await Post.find({_id:postId});
    const deletePost=await Post.deleteOne({_id:id})
    if(!deletePost){
        return next(new ErrorHandlng("The post you tried to delete does not exists",404));
    }
   res.status(200).json({
    status:"success",
    data:null
   })
  })

  export const addLike=catchAsync(async(req,res,next)=>{
    const post = await Post.find({_id: req.params.id, likes: req.params._id})
    if(post.length > 0){
     return next(new ErrorHandlng("The user already liked this post",400));
    }
    const dislikePost=await Post.find({_id: req.params.id, dislikes: req.params._id});
    if(dislikePost.length>0){
        await Post.findOneAndUpdate({_id: req.params.id}, {
            $pull: {dislikes: req.params._id}
        }, {new: true})
    }
    await Post.findOneAndUpdate({_id: req.params.id}, {
        $push: {likes: req.params._id}
    }, {new: true})
    const likesList= await Post.find({}).select('likes -_id')
    // .limit(PAGE_SIZE).skip(PAGE_SIZE*page);;
   const data= likesList[2];
console.log("Theeee"+" "+likesList)
    res.status(200).json({
       status:'success',
       data
    })
 })
   


 export const addDislike=catchAsync(async(req,res,next)=>{
    const post = await Post.find({_id: req.params.id, dislikes: req.params._id})
    if(post.length > 0){
     return next(new ErrorHandlng("The user already liked this post",400));
    }
    const likePost=await Post.find({_id: req.params.id, likes: req.params._id});
    if(likePost.length>0){
        await Post.findOneAndUpdate({_id: req.params.id}, {
            $pull: {likes: req.params._id}
        }, {new: true})
    }
    await Post.findOneAndUpdate({_id: req.params.id}, {
        $push: {dislikes: req.params._id}
    }, {new: true})
    const dislikesList= await Post.find({}).select('dislikes -_id')
    // .limit(PAGE_SIZE).skip(PAGE_SIZE*page);;
   const data= dislikesList[2];
console.log("Theeee"+" "+dislikesList)
    res.status(200).json({
       status:'success',
       data
    })
 })
export const getLists=catchAsync(async(req,res,next)=>{
 const postLikes=await Post.find({_id:req.params.id}).select('likes -_id');
 const postDislikes=await Post.find({_id:req.params.id}).select('dislikes -_id');
const likeList=postLikes[2];
const dislikeList=postDislikes[2];
    res.status(200).json({
        status:'success',
        data:{
            likeList,
            dislikeList
        }
    }) 
})


 