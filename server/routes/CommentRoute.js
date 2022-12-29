import express from 'express';
import {createComment,getAllComments,addLike,addDislike,sendLikeList,sendDislikeList} from  '../controllers/CommentController.js'
const app=express();
const commentRoute=express.Router();
commentRoute.route('/createComment/:id/:_id').post(createComment);
commentRoute.route('/getAllComments/:id').get(getAllComments);
commentRoute.route('/:id/:_id/like').patch(addLike);
commentRoute.route('/:id/:_id/dislike').patch(addDislike);
commentRoute.route(`/:id/likeList`).get(sendLikeList);
commentRoute.route(`/:id/dislikeList`).get(sendDislikeList);
export default commentRoute;
