import classes from "./CommentItem.module.css";
// import {
//   AiOutlineLike,
//   AiOutlineDislike,
//   AiFillLike,
//   AiFillDislike,
// } from "react-icons/ai";
import CommentRating from '../commentRating/CommentRating';
import { useState, useReducer, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLike, addNewDislike,fetchLikeList,fetchDislikeList } from "../../../slices/CommentSlice";
import DropDownList from "../../ui/dropDown/dropDownList/DropDownList";
const CommentItem = (props) => {
//   const f_dispatch = useDispatch();
//   const [hoverLike, setHoverLike] = useState(false);
//   const [hoverDislike, setHoverDislike] = useState(false);

//   const likeListClickHandler=()=>{
//     setHoverLike(true);
//     setHoverDislike(false);
//   }
//   const dislikeListClickHandler=()=>{
//     setHoverDislike(true);
//     setHoverLike(false);
//     }
//   const mainClickHandler=()=>{
//     if(hoverLike){
//       setHoverLike(false);
//     }
//     if(hoverDislike){
//       setHoverDislike(false);
//     }
//   }
// const initState = {
// likeClicked: false,
// dislikeClicked: false,
// likeCounter: props.likeCounter,
// dislikeCounter: props.dislikeCounter,
// };
// function reducer(state, action) {
// switch (action.type) {
// case "like":
// return {
// likeCounter: !state.likeClicked
// ? state.likeCounter + 1
// : state.likeCounter,
// dislikeCounter:
// state.dislikeCounter === 0
// ? state.dislikeCounter
// : state.dislikeCounter - 1,
// likeClicked: true,
// dislikeClicked: false,
// };
// case "dislike":
// return {
// likeCounter:
// state.likeCounter === 0 ? state.likeCounter : state.likeCounter - 1,
// dislikeCounter: !state.dislikeClicked
// ? state.dislikeCounter + 1
// : state.dislieCounter,
// likeClicked: false,
// dislikeClicked: true,
// };
// }
// }
  // const [state, dispatch] = useReducer(reducer, initState);
  // const id = props.commentId;
  // const _id = useSelector((state) => state?.reducer?.auth?.id);
  // const [likeList,setLikelist] =useState(props.likeList);
  // const [dislikeList,setDislikeList] =useState(props.dislikeList);
  // const likeClickHandler = () => {
  //   f_dispatch(addNewLike({ id, _id }))
  //     .unwrap()
  //     .then((originalPromiseResults) => {
  //       console.log("The status is +++"+" "+originalPromiseResults.statusCode)
  //       if(originalPromiseResults.statusCode===200){

  //    return dispatch({ type: "like" });

  //       }else{
  //         throw new Error("משתמש כבר אהב את התגובה.")
  //       }

  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  // };
  // const dislikeClickHandler = () => {
  //   f_dispatch(addNewDislike({ id, _id }))
  //     .unwrap()
  //     .then((originalPromiseResults) => {
  //       console.log("The statt"+originalPromiseResults.statusCode)
  //       if(originalPromiseResults.statusCode===200){
  //              return dispatch({ type: "dislike" });

  //       }else{
  //         throw new Error("משתמש כבר לא אהב את התגובה.")
  //       }
  //     })
      
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
    

  // };

  // const mouseLikeHandler = () => {
  //   setHoverLike(true);
  // };
  // const mouseDislikeHandler= () => {
  //   setHoverDislike(true);
  // };
  return (
<>
<div className={classes.mainDiv} 
// onClick={mainClickHandler}
>
<div className={classes.userDetails}>
<div className={classes.frame}>
<img src={props.imgSrc} className={classes.profile} />
</div>
<p className={classes.userName}>{props.userName}</p>
</div>
<div className={classes.comment}>
<p className={classes.text}>{props.comment}</p>
</div>
{/* <div className={classes.rateComment}>
<div clssName={classes.likeItems}>
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
<div clssName={classes.dislikeItems}>
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
{/* <div className={classes.lists}> */}
{/* <div className={classes.rightDiv}>
{hoverLike&&likeList.length>0&&<DropDownList list={likeList} className={classes.dropList} onClick={likeListClickHandler}/>}
</div> */}
<CommentRating dislikeCounter={props.dislikeCounter} likeCounter={props.likeCounter} likeList={props.likeList}
  dislikeList={props.dislikeList} commentId={props.commentId}
/>
{/* <div classes={classes.lists}>
<div className={classes.leftDiv}>
{hoverDislike&&dislikeList.length>0&&<DropDownList list={dislikeList} className={classes.dropList} onClick={dislikeListClickHandler}/>}
</div>
</div> */}
</div>

</>
);
};
export default CommentItem;
