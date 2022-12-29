import {useSelector,useDispatch} from 'react-redux';
import { addNewComment } from '../../../slices/CommentSlice';
import { useState } from 'react';
import classes from './AddComment.module.css';
const initialState={comment:'',likes:[],dislikes:[]};
const AddComment=(props)=>{
const dispatch=useDispatch();
 let{id,profile,userName}=useSelector(state=>state?.reducer?.auth);
 let _id=props.id;
 const[formData,setFormData]=useState(initialState);
 const {comment}=formData;
 const changeHandler= (e)=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}));   
    console.log(formData)   
     }
 const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(addNewComment({id,_id,formData}))
    .unwrap()
   .then((originalPromiseResults)=>{
     console.log("Successfully created new comment");
     window.location.reload(false);
    }).catch((err)=>{
       console.log(err.message);
    })

   }

 return(

<div className={classes.mainDiv}>
 <form onSubmit={submitHandler}>
 <div className={classes.userDetails}>
 <div className={classes.frame}>
<img src={profile?profile:''} className={classes.profile}/>
</div>
<div className={classes.comment}>
<input type='text' name='comment' className={classes.text} placeholder="הוספת תגובה" value={comment} onChange={changeHandler}/>   
 </div>
 <button type='submit' className={classes.btn}>הגב</button>

</div>
</form>
</div>
 )
}

export default AddComment;
