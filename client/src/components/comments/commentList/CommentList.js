import CommentItem from "../commentItem/CommentItem";
import { useState,useEffect,useRef } from "react";
import{useDispatch} from 'react-redux';
import { fetchUserInfo } from "../../../slices/UserSlice";
import { fetchComments } from "../../../slices/CommentSlice";
import classes from './CommentList.module.css';
const CommentList=(props)=>{
 const dispatch=useDispatch();
 const id=props.id;


  const [commentsList,setCommentsList]=useState([]);
  const[page,setPageNumber]=useState(0);
  const[totalPages,setTotalPages]=useState(0);
  const pages=new Array(totalPages).fill(null).map((e,index)=>index);
  let flag=false;
  useEffect(()=>{
    setCommentsList([]);
    setPageNumber(0);
      dispatch(fetchComments({id,page}))
      .unwrap()

     .then((originalPromiseResults)=>{
         originalPromiseResults.fetchData.length>0?flag=true:flag=false;
         originalPromiseResults.fetchData.forEach(element => {
            let id=element.user;
        dispatch(fetchUserInfo({id})).unwrap()
        .then((originalPromiseResults)=>{
          setCommentsList(prev=>[...prev,{id:element._id,
          userName:originalPromiseResults.userName,
          profile:originalPromiseResults.profile,
          comment:element.comment,
          likes:element.likes,
          dislikes:element.dislikes,
          // userId:originalPromiseResults._id   
        }])
        })
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
<ul>
<div className={classes.main} >
    <ul className={classes.list}>
    {commentsList.map((e)=>(<li ><CommentItem className={classes.item} key={e.id}
        imgSrc={e.profile} userName={e.userName} comment={e.comment}
        likeCounter={e.likes.length} dislikeCounter={e.dislikes.length} 
        likeList={e.likes} dislikeList={e.dislikes}
         commentId={e.id} userId={e.userId}
    /></li>))}
    </ul>
    </div>
</ul>
  )
}


export default CommentList;