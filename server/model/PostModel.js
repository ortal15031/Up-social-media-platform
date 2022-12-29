import mongoose from 'mongoose'

const postSchemea=new mongoose.Schema({
title:{
    type:String,
    required:[true,"You did not set a title"],
    minLength:6,
    maxLength:20
},
content:{
    type:String,
    minLength: 50,
    maxLength: 5000,
    required:[true,"You did not set a content"]
},
user:{type: mongoose.Types.ObjectId, ref: 'User' },
category:{
    type:String,
    required:[true,"You did not entered category"]
},
createdAt:{
    type:Date,
    default:new Date()
},
thumbnail:{
    type:String,
},
likes:{
    type:[{type: mongoose.Types.ObjectId, ref: 'user'}],
    default:[]
    } ,
    dislikes:{
        type:[{type: mongoose.Types.ObjectId, ref: 'user'}],
        default:[]
    }
})

const Post=mongoose.model('Post',postSchemea);



export default Post;
