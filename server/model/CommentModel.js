import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
    user:{type: mongoose.Types.ObjectId, ref: 'User' },
    post:{type: mongoose.Types.ObjectId, ref: 'Post'},
    comment:{
        type:String,
        required:[true,"You did not entered a comment"]
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

const Comment=mongoose.model('Comment',commentSchema);


export default Comment;
