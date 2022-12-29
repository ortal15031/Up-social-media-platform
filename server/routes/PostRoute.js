import express from 'express'
const app=express();
const postRoute=express.Router();
import {createPost,getUserPosts,getPosts,getPostsByCategory,updatePost,deletePost,getAllPosts,addLike, addDislike,
getLists} from '../controllers/PostController.js'
import {protect} from '../controllers/AuthController.js'
postRoute.route('/createpost/:id').post(protect,createPost);
postRoute.route('/getUserPosts/:id').get(getUserPosts);
postRoute.route('/getAllPosts').post(getAllPosts); 
postRoute.route('/getPostsByKey').get(getPosts); //check again the results
postRoute.route('/getPostsByCategory/:category').get(getPostsByCategory);
postRoute.route('/updatePost/:id').patch(updatePost);
postRoute.route('/deletePost/:_id').delete(deletePost);
postRoute.route('/:id/:_id/like').patch(addLike);
postRoute.route('/:id/:_id/dislike').patch(addDislike);
// postRoute.route(`/:id/likeList`).get(sendLikeList);
// postRoute.route(`/:id/dislikeList`).get(sendDislikeList);
postRoute.route('/:id/getLists').get(getLists)
export default postRoute;


