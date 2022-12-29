import express from 'express';
const app=express();
import {createUser,deleteCredentials,protect,signUser,updateUser,deleteUser} from '../controllers/AuthController.js';
const authRoute=express.Router();
// import { upload } from '../middlewares/ProfileImgMiddleware.js';

authRoute.route('/signin').post(createUser);
authRoute.route('/login').post(signUser);
authRoute.route('/logout').get(deleteCredentials);
authRoute.route('/update/:id').patch(updateUser);
authRoute.route('/deleteUser/:id').delete(protect,deleteUser);
export default authRoute;


// upload.single('profileImg'),