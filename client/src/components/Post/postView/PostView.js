import { useLocation } from "react-router-dom";
import classes from './PostView.module.css';
import {BsFillCalendarCheckFill} from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import {RiDeleteBin2Line} from 'react-icons/ri';
import {BsPencil} from 'react-icons/bs';
import{Link} from 'react-router-dom';
import CommentList from "../../comments/commentList/CommentList";
import AddComment from "../../comments/addComment/AddComment";
import PostRating from "../postRating/PostRating";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import {likePost,dislikePost} from '../../../slices/PostSlice'
import { useReducer,useState } from "react";
import DropDownList from "../../ui/dropDown/dropDownList/DropDownList";
const PostView=()=>{
  const connectedUser=useSelector(state=>state?.reducer?.auth?.id);
  const location=useLocation();

  const {id,userId,title,content,thumbnail,userName,profile,category,createdAt,likeList,dislikeList,
  likeCounter,dislikeCounter}=location.state;
  const _id=userId
  
    const dispatch=useDispatch();
    // const [hoverLike, setHoverLike] = useState(false);
    // const [hoverDislike, setHoverDislike] = useState(false);
    // const likeListClickHandler=()=>{
    //   setHoverLike(true);
    //   setHoverDislike(false);
    // }
    // const dislikeListClickHandler=()=>{
    //   setHoverDislike(true);
    //   setHoverLike(false);
    //   }
    const mainClickHandler=()=>{
      // if(hoverLike){
      //   setHoverLike(false);
      // }
      // if(hoverDislike){
      //   setHoverDislike(false);
      // }
    }
    // const initState = {
    //   likeClicked: false,
    //   dislikeClicked: false,
    //   likeCounter: likeCounter,
    //   dislikeCounter: dislikeCounter,
    //   };
    //   function reducer(state, action) {
    //   switch (action.type) {
    //   case "like":
    //   return {
    //   likeCounter: !state.likeClicked
    //   ? state.likeCounter + 1
    //   : state.likeCounter,
    //   dislikeCounter:
    //   state.dislikeCounter === 0
    //   ? state.dislikeCounter
    //   : state.dislikeCounter - 1,
    //   likeClicked: true,
    //   dislikeClicked: false,
    //   };
    //   case "dislike":
    //   return {
    //   likeCounter:
    //   state.likeCounter === 0 ? state.likeCounter : state.likeCounter - 1,
    //   dislikeCounter: !state.dislikeClicked
    //   ? state.dislikeCounter + 1
    //   : state.dislieCounter,
    //   likeClicked: false,
    //   dislikeClicked: true,
    //   };
    //   }
    //   }
    //     const [state, dispatch] = useReducer(reducer, initState);
    // console.log("The profile isssssss"+" "+createdAt);
    // const contentParser=new DOMParser().parseFromString(content,"text/xml");
    const deletePost=()=>{
        dispatch(deletePost({id})).unwrap().then((originalPromiseValue)=>{
             console.log(originalPromiseValue);
              }).catch((errorRecieved)=>{
                console.log(errorRecieved);
              })
       }
    //    const likeClickHandler = () => {
    //      dispatch_f(likePost({ id, _id }))
    //        .unwrap()
    //        .then((originalPromiseResults) => {
             
         
    //        })
    //        .catch((err) => {
    //          console.log(err.message);
    //          return;
    //        });
    //        return dispatch({ type: "like" });
     
    //    };
    //    const dislikeClickHandler = () => {
    //     dispatch_f(dislikePost({ id, _id }))
    //        .unwrap()
    //        .then((originalPromiseResults) => {
         
    //        })
    //        .catch((err) => {
    //          console.log(err.message);
    //          return;
    //        });
         
    //        return dispatch({ type: "dislike" });
     
    //    };
     
    //    const mouseLikeHandler = () => {
    //      setHoverLike(true);
    //    };
    //    const mouseDislikeHandler= () => {
    //      setHoverDislike(true);
    //    };

    return(
      <>
 
        <div className={classes.mainDiv} onClick={mainClickHandler}>
        {connectedUser===userId&&<div className={classes.editPost} >
       <Link className={classes.linkDiv} to={{pathname:`/edit_post/${id}`,
        state:{
        sendId:id,
        sendUserId:userId,
        sendTitle:title,
        sendContent:content,
        sendThumbnail:thumbnail,
        sendCategory:category,
       }}}><BsPencil className={classes.editIcon}/></Link> 
       <Link  onClick={deletePost} className={classes.linkDiv}> <RiDeleteBin2Line className={classes.deleteIcon} /></Link>
        </div>}
        <div className={classes.info}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.generalInfo}>
        <div className={classes.userInfo}>
        <div className={classes.frame}>
        <img src={profile} className={classes.profile}/>
        </div>
        <p className={classes.userName}>{userName}</p>
        </div>
        <div className={classes.date}>
        <BsFillCalendarCheckFill className={classes.calendar}/>
        <p className={classes.createdAt}>{createdAt}</p>
        </div>
        </div>
        <div dangerouslySetInnerHTML={{__html:content}}></div>
      
        </div>

  {/* <div className={classes.rateComment}>
  <div className={classes.likeItems}>
<div className={classes.like} >
<span className={classes.spanLike}>{state.likeCounter}</span>
{!state.likeClicked ? (
<AiOutlineLike className={classes.likeIcon} onClick={likeClickHandler} onMouseEnter={mouseLikeHandler}/>) : (
<AiFillLike className={classes.likeIconPressed} onMouseEnter={mouseLikeHandler}/> )}

</div>
<div className={classes.rightDiv}>
{hoverLike&&likeList.length>0&&<DropDownList list={likeList} className={classes.dropList} onClick={likeListClickHandler}/>}
</div>
</div>
<div className={classes.dislikeItems}>
<div className={classes.dislike} >
<span className={classes.spanDislike}>{state.dislikeCounter}</span>
{!state.dislikeClicked ? (
<AiOutlineDislike className={classes.dislikeIcon} onClick={dislikeClickHandler} onMouseEnter={mouseDislikeHandler} />) : (
<AiFillDislike className={classes.dislikeIconPressed}  onMouseEnter={mouseDislikeHandler}/>)}
</div>
<div className={classes.leftDiv}>
{hoverDislike&&dislikeList.length>0&&<DropDownList list={dislikeList} className={classes.dropList} onClick={dislikeListClickHandler}/>}
</div>
</div>
</div> */}


<PostRating likeList={likeList} dislikeList={dislikeList} likeCounter={likeCounter}
  dislikeCounter={dislikeCounter} id={id} _id={_id}/>
</div>
<AddComment id={id} className={classes.addComment} />
<CommentList id={id} className={classes.commentList}/>
</>
)
}

export default PostView;