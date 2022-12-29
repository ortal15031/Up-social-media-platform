import express from 'express';
const app=express();
import { getAllUsers,getProfile,getUsersByName,follow,getUserDetails, isFollower } from '../controllers/UserController.js';
import { protect } from '../controllers/AuthController.js';
const userRoute=express.Router();

userRoute.route('/profile/:id').get(protect,getProfile);
userRoute.route('/getAllUsers').get(getAllUsers);
userRoute.route('/getUser').get(getUsersByName);
userRoute.route('/follow/:id/_id').patch(follow);
userRoute.route('/getUserDetails/:id').get(getUserDetails);
userRoute.route('/isFollower/:id/:_id').get(isFollower);
export default userRoute;

 