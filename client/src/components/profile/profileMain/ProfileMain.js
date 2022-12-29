import classes from './ProfileMain.module.css'
import {useState,useRef,useEffect} from 'react'
import {BsPencil} from 'react-icons/bs'
import {BsCheck2} from 'react-icons/bs'
import {useSelector,useDispatch} from 'react-redux'
import { update } from '../../../slices/AuthSlice'
import {FaCamera} from 'react-icons/fa'
import { CheckImage,ImageUpload } from '../../../utils/imageManagement/ImageUpload'
import { authActions } from '../../../slices/AuthSlice'
import { useLocation } from 'react-router-dom';
const ProfileMain=(props)=>{
const[data,setData]=useState('');
const captionRef=useRef();
const dispatch=useDispatch();
let flag=false;
const location=useLocation();
const[isFollower,setIsFollower]=useState(false);
const obj=useSelector(state=>state?.reducer?.auth);
let{profile,userName,following,followers,caption,id,fullName}='';
location.state.flag?({profile,userName,following,followers,caption,id,fullName}=location.state)&&(flag=true):
({profile,userName,following,followers,caption,id,fullName}=obj)&&(flag=false)
useEffect(()=>{
setData({profile,userName,following,followers,caption,id,fullName})
},[profile,userName,following,followers,caption,id,fullName])
// props.sendUserData(initialState);
props.passData(data);
const[changeCaptionClicked,setCaptionClicked]=useState(false);
let _id=id
props.passUserId(_id);

const clickChangeCaptionHandler=()=>{
setCaptionClicked(prev=>!prev);
}
const saveCaptionHandler=()=>{
if(captionRef.current.value.trim!=''){
const val=captionRef.current.value;
console.log("The val"+" "+val);
data.caption=val;
dispatch(update({id,data})).unwrap().then((originalPromiseValue)=>{
console.log("עודכון בוצע בהצלחה")
dispatch(authActions.updateCaption(val));
setData(prev=>({...prev,caption:val}));
 setCaptionClicked(false);
// setApproveCaption(true);
})
}
}
const changeProfileHandler=async(e)=>{
 try{  
console.log(e.target.files[0]);
const file=e.target.files[0];
let check;
if(file)
check=CheckImage(file);
 else
throw new Error("יש בעיה בקוב שהזנת")
if(check)
 throw new Error("פורמט זה אינו נתמך")
 const photo=await ImageUpload(file);
 console.log(photo.url);
if(photo.url){
data.profile=photo.url;
dispatch(update({id,data})).unwrap().then((originalPromiseValue)=>{
console.log("עדכון בוצע בהצלחה")
dispatch(authActions.updateProfile(photo.url));
setData(prev=>({...prev,profile:photo.url}));    
})
}
}
catch(err){
console.log(err.message)
}
}

return(
<div className={classes.profileDiv}>  

<div className={classes.rightDiv}>
<div className={classes.frame}>
<img src={profile} className={classes.profileImg} alt=""/>
</div>
{!flag&&<div className={classes.cameraIconDiv}>
<FaCamera className={classes.cameraIcon} />
<input type="file" onChange={changeProfileHandler} accept="image/*" className={classes.inputImg} />
</div>}
</div>
<div className={classes.leftDiv}> 
<span className={classes.userName}>{userName}</span>
<div className={classes.aboutDiv}>
{(!changeCaptionClicked)?
<span className={classes.caption} >{caption}</span>
:<div className={classes.editDiv}><BsCheck2 onClick={saveCaptionHandler} className={classes.checkmark}/><input type="text" placeholder="הקלד תיאור" ref={captionRef} className={classes.input}></input></div>}
{!flag&&<div className={classes.pencilDiv}> <BsPencil className={classes.pencilIcon} onClick={clickChangeCaptionHandler}/>
</div>}
</div>
<div className={classes.bottomDiv}>
<ul className={classes.followingList}>
<li ><span>{followers.length}</span>עוקבים</li>
<li><span>{following.length}</span>נעקבים</li>
</ul>
</div>
</div>
</div>
)}

export default ProfileMain;