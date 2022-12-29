import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from "../api/Api";

export const addNewComment=createAsyncThunk('comment/add',async({id,_id,formData}, { fulfillWithValue,rejectWithValue })=>{
    try{
        const response=await api.addComment(id,_id,formData);
        console.log(response.data)
        return fulfillWithValue(response.data);
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const fetchComments=createAsyncThunk('comment/fecthComments',async({id,page},{fulfillWithValue,rejectWithValue})=>{
    try{
     const response=await api.getCommentsPerPost(id,page);
     const fetchData=await response.data.data.comments;
const totalPages=await response.data.data.totalPages;
// console.log("The data recieved is"+""+data);
console.log("The pagessss"+" "+totalPages);
return fulfillWithValue({fetchData,totalPages});

    }catch(err){
        console.log(err.message);
    }
})

export const addNewLike=createAsyncThunk('comment/addLike',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
    try{
        const response=await api.addLikeToComment(id,_id);
        if(response.statusCode==='400'){
            throw new Error("כבר נעשה לייק לתגובה");
        }
        const data= await response.data.data;
        const statusCode= response.status;
        return fulfillWithValue({data,statusCode});
    }
    catch(err){
        console.log(err.message);
    }
})
export const addNewDislike=createAsyncThunk('comment/addDisLike',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
    try{
        const response=await api.addDislikeToComment(id,_id);
        if(response.statusCode==='400'){
            throw new Error("כבר נעשה דיסלייק לתגובה");
        }
        const data=await response.data.data;
        const statusCode=response.status;
        return fulfillWithValue({data,statusCode});
    }
    catch(err){
        console.log(err.message);
    }
})
export const fetchLikeList=('comment/getLikes',async({id},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.getLikeList(id);
    if(response.statusCode==='400'){
        throw new Error("אין כרגע משתמשים שלא אהבו את התגובה")
    }
    const data=await response.data.data.dislikeList;
    
   return fulfillWithValue({data});

    }
    catch(err){
        console.log(err.message);
    }
})

export const fetchDislikeList=('comment/getDislikes',async({id},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.getDislikeList(id);
    if(response.statusCode==='400'){
        throw new Error("אין כרגע משתמשים שלא אהבו את התגובה")
    }
    const data=await response.data.data.dislikeList;
    
   return ({data});

    }
    catch(err){
        console.log(err.message);
    }
})
const CommentSlice=createSlice({
    name:'comment',
    reducers:{
    },
    extraReducers:{
    } 

})

export const commentActions=CommentSlice.actions;

export default CommentSlice;
