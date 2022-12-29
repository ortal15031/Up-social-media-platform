import classes from './Search.module.css';
import { BiSearchAlt } from 'react-icons/bi';
import {BiUser} from 'react-icons/bi';
import {BiPaperPlane} from 'react-icons/bi';
import {SlOptions} from 'react-icons/sl'
import React,{useState,useReducer,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
const initState={element:<SlOptions className={classes.icon}/>,
searchKeyWords:"הקלד כאן מילת חיפוש"}
function reducer(state,action){
 switch(action.type){
  case 'posts':
return {element:state.element=<BiPaperPlane className={classes.icon}/>,
searchKeyWords:state.searchKeyWords="חיפוש לפי פוסטים"};
case 'users':
return {element:state.element=<BiUser className={classes.icon}/>,
searchKeyWords:state.searchKeyWords="חיפוש לפי אנשים"};
case'default':
return {element: state.element=<SlOptions className={classes.icon}/>,
searchKeyWords:state.searchKeyWords="הקלד כאן מילת חיפוש"};
}
}

const SearchPost=(props)=>{
   let categoryRef=useRef();
   let dropListRef=useRef();
  const[visibility,setVisibility]=useState(false);
  const[state,dispatch]=useReducer(reducer,initState);
  const[value,setValue]=useState('');
  const clickHandler=()=>{
    setVisibility(prev=>!prev)
  }

  useEffect(()=>{
const handler=(event)=>{
    if(!categoryRef?.current?.contains(event.target)
    &&!dropListRef?.current?.contains(event.target))
    setVisibility(false);
}

document.addEventListener('mousedown',handler);
return()=>{document.removeEventListener("mousedown",handler)};

})
  const postsHandler=()=>{
    console.log(state.element)
    setVisibility(false);
    return dispatch({type:'posts'});
  }
  const userHandler=()=>{
    setVisibility(false);
    return dispatch({type:'users'});
  }
  const defaultHandler=()=>{
    setVisibility(false);
    return dispatch({type:'default'})
  }

const changeHandler=(e)=>{
  setValue(e.target.value);
  console.log(value);
  console.log(state.searchKeyWords);
}
return(
 <div className={classes.card}>
 <form >
<div className={classes.formGroup}>
<div className={classes.dropDown}>
<div className={classes.defaultOption} onClick={clickHandler} ref={categoryRef}>
{state.element}
</div>
{visibility&&<div className={classes.dropDownList} ref={dropListRef}>
<ul>
<li onClick={defaultHandler}><SlOptions/></li>
<li onClick={postsHandler}>פוסטים<BiPaperPlane /></li>
<li onClick={userHandler}>אנשים<BiUser /></li>
</ul>
</div>}
</div>
<div className={classes.search}>
<button className={classes.searchBtn} type="submit">
<Link
 to={{pathname:`/search_by_keyword`,state:{
  filter:state.searchKeyWords,
  keyword:value

}}} 
className={classes.searchLink}><BiSearchAlt size="25px" /></Link>
</button>
<input type="text" className={classes.searchInput} placeholder={state.searchKeyWords} value={value} onChange={changeHandler}/>

</div>
</div>
</form>
</div>
    )
}


export default SearchPost;