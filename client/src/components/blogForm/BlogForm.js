import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import classes from './BlogForm.module.css'
import '../../../node_modules/react-quill/dist/quill.snow.css'
import Content from './content/Content'
import Title from './title/Title'
import OptionList from './select/optionList/OptionList'
import RequirementLabel from '../ui/requirementLabel/RequirementLabel'
import DescriptionImg from './descriptionImg/DescriptionImg'
import { ImageUpload,CheckImage } from '../../utils/imageManagement/ImageUpload'
import {createPost,updatePost} from '../../slices/PostSlice'
const BlogForm=()=>{
const location=useLocation();
const{sendId,sendUserId,sendTitle,sendContent,sendThumbnail,sendCategory}=location.state;
const initialState={id:sendId??'',title:sendTitle??'',content:sendContent??'',category:sendCategory??'',thumbnail:sendThumbnail??'',createdAt:new Date().toISOString()};
const history=useHistory(); 
const dispatch=useDispatch();  
const[formData,setFormData]=useState(initialState);
const id=useSelector(state=>state?.reducer?.auth?.id);
const{title,content,category,thumbnail,createdAt}=formData;
console.log(id)
useEffect(()=>{
  if(id)
  setFormData(prev=>({...prev,id}))
},[])
const changeHandler=(e)=>{
  setFormData(prev=>e.target?{...prev,[e.target.name]:e.target.value}:{...prev,content:e})
  console.log(formData)
}
const changeImageHandler=async(e)=>{
  try{  
console.log(e.target.files[0]);
const file=e.target.files[0]
let check;
if(file)
check=CheckImage(file);
else
 throw new Error("יש בעיה בקוב שהזנת")
if(check)
  throw new Error("פורמט זה אינו נתמך")
const photo=await ImageUpload(file);
setFormData(prev=>({...prev,thumbnail:`${photo.url}`}))
  }
catch(err){
  console.log(err.message)
}
}
const cancelClickHandler=(e)=>{
history('/profile')
}
const submitHandler=(e)=>{
  e.preventDefault();
  if(id&&title&&content&&thumbnail&&category&&createdAt){
    if(category!="בחר אופציה"){
    dispatch(!sendId?createPost ({id,formData}):updatePost({id,formData}))
    .unwrap()
   .then((originalPromiseResults)=>{
       console.log("User signed in successfully");
       history.push('/profile')
    }).catch((err)=>{
       console.log(err.message);
    })
  }
   }else{
       console.log("לא עובד")
   }
  }

    return (
  <div className={classes.mainDiv}>
  <form onSubmit={submitHandler}>
  <div className={classes.row}>
  <Title onChange={changeHandler} value={title}/>
  </div>
  <div className={classes.row}>
  <RequirementLabel>קטגוריה</RequirementLabel>
  <OptionList onChange={changeHandler} value={category}/>
  </div>                                
  <div className={classes.row}>

  <DescriptionImg onChange={changeImageHandler} />
  </div>
  <div className={classes.row}>
  <Content onChange={changeHandler} value={content}></Content>
  </div>
  <div className={classes.submitDiv}>
  <button type='submit'>שמירה</button>
  <button onClick={cancelClickHandler}>ביטול</button>  
  </div>
  </form>
  </div>
    )
}


export default BlogForm;
