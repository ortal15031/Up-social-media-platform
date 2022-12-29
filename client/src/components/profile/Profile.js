import PageWrapper from "../ui/pageWrapper/PageWrapper";
import classes from './Profile.module.css';
import ProfileNavBar from "./profileNavBar/ProfileNavBar";
import ProfileMain from "./profileMain/ProfileMain";
import {useSelector} from 'react-redux'
import {useState} from 'react'
import PostList from "../Post/PostList/PostList";
import {FaPlus,FaMinus} from 'react-icons/fa';
const Profile=()=>{
const[state,setState]=useState('');
const [_id,set_id]=useState('');
const isFollower=false;
    // const[userInfo,setUserInfo]=useState(null);
    const onLoadPostsHandler=(flag)=>{
      console.log("The flag is :"+flag);
     setState(flag);
    }
const[dataPassed,setData]=useState('');
const passDataHandler=(data)=>{
setData(data);
console.log("Dataaaaa"+" "+dataPassed.userName)
}
const handleUserId=(_id)=>{
set_id=_id;
}
const id=useState(state=>state?.reducer?.auth?.id);
return(
      
  //  <PageWrapper>
   <div className={classes.main}>
   {_id!=id&&<div className={classes.addDiv}>
{!isFollower?
<FaPlus className={classes.addIcon}/>:<FaMinus className={classes.addIcon}/>
}
</div>}
   <header></header>
    <div className={classes.rightDiv}>
  <ProfileMain passData={passDataHandler} passUserId={handleUserId}/>
    </div>
    <div className={classes.leftDiv}>
    <ProfileNavBar onLoadPosts={onLoadPostsHandler}/>

    </div>
    {state&&
    <PostList data={dataPassed}/>
    }

   </div>

  //  </PageWrapper>

    )
 }

export default Profile;