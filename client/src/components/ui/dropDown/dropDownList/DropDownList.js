import DropDownItem from '../dropDownItem/DropDownItem';
import classes from './DropDownList.module.css';
import {useState,useEffect} from 'react';
import{fetchUserInfo} from '../../../../slices/UserSlice';
import{Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
const DropDownList=(props)=>{
const dispatch=useDispatch();
const list=props.list;
let flag=false;
const[likeList,setLikeList]=useState([]);
useEffect(()=>{
  setLikeList([]);
  list&&list.forEach(element=>{
    console.log("The element is"+element);
      const id=element;
        dispatch(fetchUserInfo({id}))
        .unwrap()
       .then((originalPromiseResults)=>{
          //  originalPromiseResults.fetchData.length>0?flag=true:flag=false;
          setLikeList(prev=>[...prev,{id:element,
         profile:originalPromiseResults.profile,
         userName:originalPromiseResults.userName,
        //  caption:originalPromiseResults.caption,
        //  fullName:originalPromiseResults.fullName,
        //  followers:originalPromiseResults.followers,
        //  following:originalPromiseResults.following
       }])   
       console.log("The id:"+element);
       console.log("the profile"+originalPromiseResults.profile);
       }).catch((err)=>{
        console.log(err.message)
     });
  
        })
},[])

return(
<div className={classes.dropDownList}>
<ul className={classes.list}>
{likeList.map((e)=>

     <li> <DropDownItem  userName={e.userName}
      img={e.profile} />
 </li>
      )
      }  
  </ul>
</div>
)
}

export default DropDownList;

