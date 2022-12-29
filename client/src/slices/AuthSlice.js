import{createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from "../api/Api";
import {useHistory} from 'react-router-dom'

export const register=createAsyncThunk('auth/signin',async({formData}, { fulfillWithValue,rejectWithValue })=>{
    console.log(formData)
    try{
        console.log("the data is");
        const response=await api.signIn(formData);
       if(response.statusCode===403){
        throw new Error("שני שדות הסיסמא אינם זהים");
       }
        if(response.statusCode===400){
        throw new Error("המייל או שם המשתמש שהקלדת כבר קיימים במערכת")
       }
       if(response.statusCode===404){
        throw new Error("אחד או יותר מהשדות לא ריקים")
       }
    //    localStorage.setItem('user',response.token);
        return fulfillWithValue(response.data);
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const signup=createAsyncThunk('auth/signup',async({formData},{fulfillWithValue,rejectWithValue})=>{
    try{
     const response=await api.login(formData);
     if(response.statusCode===404){
      throw new Error("לא הוקלדו שם משתמש או סיסמא")
     }
     if(response.statusCode===400){
        throw new Error("שם משתמש או סיסמא אינם נכונים")
     }
     console.log(response.data.token);
    console.log("user details"+" "+response.data.data._id);
    return response.data.data;
    }catch(err){
        rejectWithValue(err.response.data)
    }
})

export const logout=createAsyncThunk('auth/logout',async()=>{
    try{
  const response=await api.signout();
  if(response.statusCode===200){
    console.log("The respone is"+response.statusCode);  
}
  else{
    throw new Error("אירעה שגיאה במהלך ההתנתקות. נסה שנית")

  }
    }
    catch(err){
       console.log(err.message);
    }
})

export const update=createAsyncThunk('auth/update',async({id,data}, { fulfillWithValue,rejectWithValue })=>{
    try{
        console.log("The data issssss:"+" "+data);
        const response=await api.changeUserData(id,data);
        if(response.statusCode!==200){
            throw new Error("הייתה בעיה בעידכון המשתמש");
        }
        console.log(response.data);

    }catch(err){
        rejectWithValue(err.message);
    }
 
})

const initialState={
id:'',
fullName:'',
userName:'',
email:'',
followers:'',
following:'',
caption:'',
profile:'',
status:'undefined'
,error:null}
const authSlice=createSlice({
name:'auth',
initialState,
reducers:{

    updateProfile(state,{payload}){
        state.profile=payload;
    },
    updateCaption(state,{payload}){
        state.caption=payload;
    }

},
extraReducers:{
registerExtraReducer(builder){
builder.addCase(register.pending,(state,action)=>{
    state.status='loading'
}).addCase(register.fulfilled,(state,action)=>{
   state.status="success"
}).addCase(register.rejected,(state,action)=>{
    state.status='error';
    state.error=state.payload.message;
})
},

logoutExtraReducer(builder){
   builder.addCase(logout.pending,(state,{payload})=>{
    state.status="waiting";
   }) .addCase(logout.fulfilled,(state,{payload})=>{
    state.status="logout";
   }).addCase(logout.rejected,(state,{payload})=>{
    state.status="error";
    state.message=payload.message;
   })
},
[signup.pending]:(state,action)=>{

},
[signup.fulfilled]:(state,action)=>{
  state.id=action.payload._id;
 state.email=action.payload.email;
 state.fullName=action.payload.fullName;
 state.userName=action.payload.userName;
 state.profile=action.payload.profile;
},
[signup.rejected]:(state,action)=>{
    state.error="Failed";
},
[update.pending]:(state,action)=>{
    
},
[update.fulfilled]:(state,action)=>{

}
}

});

export const authActions=authSlice.actions;

export default authSlice;