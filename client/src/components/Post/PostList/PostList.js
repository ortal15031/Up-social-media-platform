import MediumCard from "../../ui/MediumCard/MediumCard";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../../../slices/PostSlice";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import user from '../../../images/user.png';
import classes from './PostList.module.css'
import {Link, useLocation} from 'react-router-dom'
import PageItem from '../../ui/pageItem/PageItem' 
const PostList=(props)=>{
const connectedUser=useSelector(state=>state?.reducer?.auth?.id);
console.log("The connected user is"+" "+connectedUser)
 const dispatch=useDispatch();
  const {id,userName,profile}=props.data;
  const [postsList,setPostsList]=useState([]);
  const[page,setPageNumber]=useState(0);
  const[totalPages,setTotalPages]=useState(0);
  const pages=new Array(totalPages).fill(null).map((e,index)=>index);
  let flag=false;
  useEffect(()=>{
    setPostsList([]);
    setPageNumber(0);

      dispatch(getUserPosts({id,page}))
      .unwrap()
     .then((originalPromiseResults)=>{
         console.log("thte "+" "+originalPromiseResults.page);
         originalPromiseResults.data.length>0?flag=true:flag=false;
         originalPromiseResults.data.forEach(element => {
          setPostsList(prev=>[...prev,{id:element._id,
            title:element.title,
          category:element.category,
          content:element.content,
          thumbnail:element.thumbnail,
          createdAt:new Date(element.createdAt),
          likes:element.likes,
          dislikes:element.dislikes
        }])
        setTotalPages(originalPromiseResults.totalPages);
         });
      }).catch((err)=>{
         console.log(err.message)
      });
        
  },[page])
 
  const clickHandler=(e,index)=>{
    setPageNumber(index);
    console.log("The index"+index);
  }
    return(
    <>
 {  !{flag} ?<p>אין פוסטים זמינים</p>:
     <div className={classes.listDiv}>
    <ul className={classes.list}>
      {postsList.map((e)=>
     <Link className={classes.link} to={{pathname:`/post_details/${e.id}`,
       state:{
        id:e.id,
        userId:id,
        title:e.title,
        content:e.content,
        thumbnail:e.thumbnail,
        userName,
        profile,
        category:e.category,
        createdAt:e.createdAt.getDate()+"/"+(e.createdAt.getMonth()+1)+"/"+e.createdAt.getFullYear(),
        likeList:e.likes,
        dislikeList:e.dislikes,
        likeCounter:e.likes.length,
        dislikeCounter:e.dislikes.length
       }}}> <MediumCard className={classes.li}  key={e.id} imgSrc={e.thumbnail} userName={userName}
       profile={profile} title={e.title} createdAt={e.createdAt.getDate()+"/"+(e.createdAt.getMonth()+1)+"/"+e.createdAt.getFullYear()}

       />
       </Link>)
       }

    
    </ul>
    <div className={classes.pages}>
    {pages.map((e,index)=>(<PageItem onClick={()=>{
          setPageNumber(index);
    console.log("The index"+index);
    }}>{index+1}</PageItem>))}
    </div>
    </div>
   }
   </>
    )
}



export default PostList;