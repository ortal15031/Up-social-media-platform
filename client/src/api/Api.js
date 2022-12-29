import { FormatIndentDecreaseTwoTone } from '@material-ui/icons';
import axios from 'axios';
axios.defaults.withCredentials=true;
const baseURL="http://localhost:8000";
axios.defaults.withCredentials=true;
const API=axios.create({
    baseURL,
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    },

});




export const signIn=(formData)=>API.post('/authentication/signin',formData);
export const login=(formData)=>API.post('/authentication/login',formData);
export const signout=()=>API.get('/authentication/logout');
export const getProfile=(userId)=>API.get(`/user/profile/${userId}`);
export const changeUserData=(id,data)=>API.patch(`authentication/update/${id}`,data);
export const removeUser=(id)=>API.delete(`/authentication//deleteUser/${id}`);
export const createPost=(id,formData)=>API.post(`/post/createpost/${id}`,formData);
export const fetchPosts=(id,page)=>API.get(`/post/getUserPosts/${id}?page=${page}`,{params:{id}});
export const getAllP=(page)=>API.post(`/post/getAllPosts?page=${page}`);
export const getPostsByKeyword=(keyword,page)=>API.get(`/post/getPostsByKey?page=${page}`,{ params: { keyword } });
export const getPostsByCategory=(category,page)=>API.get(`/post/getPostsByCategory/${category}?page=${page}`);
export const changePostData=(id,formData)=>API.patch(`/post/updatePost/${id}`, formData);
export const removePost=(_id)=>API.delete(`/post/deletePost/${_id}`);
export const likePost=(id,_id)=>API.patch(`/post/${id}/${_id}/like`);
export const dislikePost=(id,_id)=>API.patch(`/post/${id}/${_id}/dislike`);
// export const getLikeListPost=(id)=>API.get(`/post/${id}/likeList`);
// export const getDislikeListPost=(id)=>API.get(`/post/${id}/dislikeList`);
export const getLikesDislikes=(id)=>API.get(`/post/${id}/getLists`,{params:{id}});
export const getUserByKeyWord=(keyword,page)=>API.get(`/user/getUser?page=${page}`,{ params: { keyword } });
export const addFollow=(id,_id)=>API.patch(`/user/follow/${id}/${_id}`);
export const getAllUsers=(page)=>API.get(`/user/getAllUsers?page=${page}`);
export const getUserInfo=(id)=>API.get(`/user/getUserDetails/${id}`);
export const addComment=(id,_id,formData)=>API.post(`/comment/createComment/${id}/${_id}`,formData);
export const getCommentsPerPost=(id,page)=>API.get(`/comment/getAllComments/${id}?page=${page}`);
export const addLikeToComment=(id,_id)=>API.patch(`/comment/${id}/${_id}/like`);
export const addDislikeToComment=(id,_id)=>API.patch(`/comment/${id}/${_id}/dislike`);
export const getLikeList=(id)=>API.get(`/comment/${id}/likeList`);
export const getDislikeList=(id)=>API.get(`/comment/${id}/dislikeList`);
export const checkIfFollow=(id,_id)=>API.get(`/user/isFollower/${id}/${_id}`)



