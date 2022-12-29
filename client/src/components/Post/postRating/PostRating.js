import {
    AiOutlineLike,
    AiOutlineDislike,
    AiFillLike,
    AiFillDislike,
  } from "react-icons/ai";
  import DropDownList from "../../ui/dropDown/dropDownList/DropDownList";
import {useReducer,useState} from 'react';
import { useDispatch } from "react-redux";
import classes from './PostRating.module.css';
import {likePost,dislikePost,fetchLists} from '../../../slices/PostSlice'

const PostRating=(props)=>{
const dispatch_f=useDispatch();
const [hoverLike, setHoverLike] = useState(false);
const [hoverDislike, setHoverDislike] = useState(false);
const _id=props._id;
const id=props.id;
const [likeList,setLikeList]=useState(props.likeList);
const [dislikeList,setDislikeList]=useState(props.dislikeList);
const likeListClickHandler=()=>{
  setHoverLike(true);
  setHoverDislike(false);
}
const dislikeListClickHandler=()=>{
  setHoverDislike(true);
  setHoverLike(false);
  }
const mainClickHandler=()=>{
  if(hoverLike){
    setHoverLike(false);
  }
  if(hoverDislike){
    setHoverDislike(false);
  }
}
const initState = {
 likeClicked: false,
dislikeClicked: false,
likeCounter: props.likeCounter,
dislikeCounter: props.dislikeCounter,
};
function reducer(state, action) {
switch (action.type) {
case "like":
return {
likeCounter: !state.likeClicked
? state.likeCounter + 1
: state.likeCounter,
dislikeCounter:
state.dislikeCounter === 0
? state.dislikeCounter
: state.dislikeCounter - 1,
likeClicked: true,
dislikeClicked: false,
};
case "dislike":
return {
likeCounter:
state.likeCounter === 0 ? state.likeCounter : state.likeCounter - 1,
dislikeCounter: !state.dislikeClicked
? state.dislikeCounter + 1
: state.dislieCounter,
likeClicked: false,
dislikeClicked: true,
};
}
}
const updateList=()=>{
  dispatch_f(fetchLists({ id }))
  .unwrap()
  .then((originalPromiseResults) => {
    console.log("The likiii"+" "+originalPromiseResults.data)
   
  }).catch((err) => {
    console.log(err.message);
    });
}
const [state, dispatch] = useReducer(reducer, initState);
const likeClickHandler = () => {
dispatch_f(likePost({ id, _id }))
.unwrap()
.then((originalPromiseResults) => {
if(originalPromiseResults.statusCode===200){
    return dispatch({ type: "like" });
    
} 
else{
    throw new Error("המשתמש כבר אהב את הפוסט")
}       
}).catch((err) => {
console.log(err.message);
});
};
const dislikeClickHandler = () => {
dispatch_f(dislikePost({ id, _id }))
.unwrap()
.then((originalPromiseResults) => {
if(originalPromiseResults.statusCode===200){
  // updateList();
    return dispatch({ type: "dislike" });
}
else{
    throw new Error("המשתמש כבר סימן שלא אהב את הפוסט")
}
})
.catch((err) => {
console.log(err.message);
return;
});
                    
};      
 const mouseLikeHandler = () => {
setHoverLike(true);
};
const mouseDislikeHandler= () => {
setHoverDislike(true);
};
return(
    <div className={classes.rateComment} onClick={mainClickHandler}>
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
  <AiFillDislike onMouseEnter={mouseDislikeHandler}/>)}
  </div>
  <div className={classes.leftDiv}>
  {hoverDislike&&dislikeList.length>0&&<DropDownList list={dislikeList} className={classes.dropList} onClick={dislikeListClickHandler}/>}
  </div>
  </div>
  </div>
)
}
export default PostRating;
