import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from "../api/Api";

export const fetchUserByKeyWord=createAsyncThunk('user/getAllByKeyWord',async({keyword,page},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.getUserByKeyWord(keyword,page);
     if(response.statusCode===400){
        throw new Error("לא קיימי משתמשים בשם זה")
     }
     const fetchData=await response.data.data.users;
     const totalPages=await response.data.data.totalPages;
    return fulfillWithValue({fetchData,totalPages});
    
    }catch(err){
        rejectWithValue(err.response.data)
    }
});

export const follow=createAsyncThunk('user/follow',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.addFollow(id,_id);
     const data=await response.data;
   return fulfillWithValue({data});
    }catch(err){
        console.log(err.message)
    }
});
export const checkIfUserFollow=createAsyncThunk('user/isfollow',async({id,_id},{fulfillWithValue,rejectWithValue})=>{
try{
const response=await api.checkIfFollow(id,_id);
const data=await response.data;
return fulfillWithValue({data});
}catch(err){
    console.log(err.message);
}
});
    export const fetchAllUsers=createAsyncThunk('user/getAll',async({page},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.getAllUsers(page);
    const fetchData=await response.data.data.allUsers;
    const totalPages=await response.data.data.totalPages;
  return fulfillWithValue({fetchData,totalPages});
    }catch(err){
        console.log(err.message);
    }
});
export const fetchUserInfo=createAsyncThunk('user/getInfo',async({id},{fulfillWithValue,rejectWithValue})=>{
    try{
    const response=await api.getUserInfo(id);
    const data=await response.data.data.user;
  return  fulfillWithValue(data)
    }catch(err){
     console.log(err.response.data);
    }
})
const initialState={status:"undefined"};
const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

    },extraReducers:{

    }
});

export const userActions=UserSlice.actions;

export default UserSlice;