import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import{createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from "../api/Api";
 
export const createPost=createAsyncThunk('posts/create',async({id,formData}, { fulfillWithValue,rejectWithValue })=>{
   console.log(formData)
   try{
       console.log("the data is");
       const response=await api.createPost(id,formData);
      if(response.statusCode===403){
       throw new Error("המשתמש אינו קיים");
      }
       if(response.statusCode===400){
       throw new Error("אחד או יותר מהשדת שהקלדת אינו קיים")
      }
      if(response.statusCode===404){
       throw new Error("לא קיים אישור חוקי")
      }
       return fulfillWithValue(response.data);
   }
   catch(err){
       return rejectWithValue(err.response.data);
   }
});
export const getUserPosts=createAsyncThunk('post/get',async({id,page},{fulfillWithValue,rejectWithValue})=>{
   try{
const response=await api.fetchPosts(id,page);
if(response.statusCode==='404'){
   throw new Error("אין למשתמש פוסטים");
}
const data=await response.data.data.userPosts;
const totalPages=await response.data.data.totalPages;
console.log(data);
console.log("The total pages number is "+totalPages);
return fulfillWithValue({data,totalPages});
   }
   catch(err){
      console.log(err.message);
   }
})

export const fetchAllPosts=createAsyncThunk('post/getAll',async({page},{fulfillWithValue,rejectWithValue})=>{
   try{
const response= await api.getAllP(page);
if(response.statusCode==='400'){
   throw new Error("אין פוסטים זמינים כרגע");

}
const fetchData=await response.data.data.posts;
const totalPages=await response.data.data.totalPages;

return fulfillWithValue({fetchData,totalPages});
   }catch(err){
      console.log(err.message);
   }
});


export const fetchPostsByKeyWord=createAsyncThunk('post/getKeyword',async({keyword,page},{fulfillWithValue,rejectWithValue})=>{
   try{
const response= await api.getPostsByKeyword(keyword,page);
if(response.statusCode==='400'){
   throw new Error("אין פוסטים זמינים כרגע");

}
const fetchData=await response.data.data.posts;
const totalPages=await response.data.data.totalPages;
 console.log("The data recieved is"+""+fetchData);
console.log("The pagessss"+" "+totalPages);
return fulfillWithValue({fetchData,totalPages});
   }catch(err){
      console.log(err.message);
   }
});

export const fetchPostsByCategory=createAsyncThunk('post/getByCategory',async({category,page},{fulfillWithValue,rejectWithValue})=>{
   try{
  const response=await api.getPostsByCategory(category,page);
  if(response.statusCode==='400'){
   throw new Error("לא נימצאו תוצאות עבור החיפוש")
}
  const data=await response.data.data.posts;
  const totalPages=await response.data.data.totalPages;
 return fulfillWithValue({data,totalPages});
   }catch(err){
      console.log(err.response.message);
   }
})
export const updatePost=createAsyncThunk('post/update',async({id,formData},{fulfillWithValue,rejectWithValue})=>{
   try{
  const response=await api.changePostData(id,formData);
  if(response.statusCode==='404'){
   throw new Error("לא נימצאו תוצאות עבור החיפוש")
  }
  fulfillWithValue(response.data);
   }catch(err){
      console.log(err.message);
   } 
});
export const deletePost=createAsyncThunk('post/remove',async({_id},{fulfillWithValue,rejectWithValue})=>{
   try{
   const response=await api.removePost(_id);
   return response.data;
   }catch(err){
      console.log(err.message);
   }
});

export const likePost=createAsyncThunk('post/addLike',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
   try{
       const response=await api.likePost(id,_id);
       if(response.statusCode==='400'){
           throw new Error("כבר נעשה לייק לתגובה");
       }
       const data= await response.data.data;
       const statusCode=response.status;
       return fulfillWithValue({data,statusCode});
   }
   catch(err){
       console.log(err.message);
   }
})

export const dislikePost=createAsyncThunk('post/addDisLike',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
   try{
       const response=await api.dislikePost(id,_id);
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
export const fetchLists=createAsyncThunk('post/lists',async({id},{fulfillWithValue,rejectWithValue})=>{
try{
   const response=await api.getLikesDislikes(id);
   // const likeList=await response.data.data.likeList;
   // const dislikeList=await response.data.data.dislikeList;
    const data=await response.data;
   return fulfillWithValue({data});

}catch(err){
   console.log(err.message)
}
})

const initialState={status:'undefined'};
const PostSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
    },
    extraReducers:{
   [createPost.pending]:(state,action)=>{
      state.status='loading';
   },
   [createPost.fulfilled]:(state,action)=>{
      state.status='success';
   },
   [createPost.rejected]:(state,action)=>{
      state.status='error';
   }
    } 

})

export const postActions=PostSlice.actions;

export default PostSlice;


