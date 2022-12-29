import PageItem from "../../ui/pageItem/PageItem";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import{useEffect,useState} from 'react';
import classes from './ByKeyword.module.css';
import { fetchAllPosts ,fetchPostsByKeyWord} from "../../../slices/PostSlice";
import {fetchUserInfo,fetchAllUsers,fetchUserByKeyWord} from '../../../slices/UserSlice';
import MediumCard from '../../ui/MediumCard/MediumCard'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SmallCard from '../../ui/smallCard/SmallCard';
const SearchByKeyword=()=>{
  const location=useLocation();
  const{filter,keyword}=location.state;
  const dispatch=useDispatch();
  const {id,userName,profile}=useSelector(state=>state?.reducer?.auth);
  const [postsList,setPostsList]=useState([]);
  const[page,setPageNumber]=useState(0);
  const[totalPages,setTotalPages]=useState(0);
  const[cardType,setCardType]=useState('');
  const pages=new Array(totalPages).fill(null).map((e,index)=>index);
  let flag=false;
  useEffect(()=>{
    JSON.stringify(keyword);
    setPostsList([]);
    setPageNumber(0);
    keyword.toString();
      dispatch(
      filter==='חיפוש לפי פוסטים'?keyword.trim()===''?fetchAllPosts({page}):
      fetchPostsByKeyWord({keyword,page}):keyword.trim()===''?  fetchAllUsers({page}):
       fetchUserByKeyWord({keyword,page}))
      .unwrap()
     .then((originalPromiseResults)=>{
         originalPromiseResults.fetchData.length>0?flag=true:flag=false;
                //  if(filter=='חיפוש לפי פוסטים'){
         originalPromiseResults.fetchData.forEach(element => { 
        // if(filter=='חיפוש לפי פוסטים'){
        let id=element.user;
        if(filter=='חיפוש לפי פוסטים'){
        dispatch(fetchUserInfo({id})).unwrap()
        .then((originalPromiseResults)=>{
          setPostsList(prev=>[...prev,{id:element._id,
            title:element.title,
          category:element.category,
          content:element.content,
          thumbnail:element.thumbnail,
          createdAt:new Date(element.createdAt),
          userName:originalPromiseResults.userName,
          profile:originalPromiseResults.profile,
          likes:element.likes,
          dislikes:element.dislikes,
          // console.log("The ")
        }])
        console.log(element.likes);
        setCardType(false);
        })
        }
      else{
        setPostsList(prev=>[...prev,{id:element._id,
       profile:element.profile,
       userName:element.userName,
       caption:element.caption,
       fullName:element.fullName,
       followers:element.followers,
       following:element.following
     }])   
     console.log("The followers:"+element.followers);
     setCardType(true);
      }
     })
         ;
      setTotalPages(originalPromiseResults.totalPages);
      }).catch((err)=>{
         console.log(err.message)
      });

      console.log("The filterrrrrrrrrrr"+filter)
  },[page,keyword,filter])
 
    return(
    <>
 {  !{flag} ?<p>אין פוסטים זמינים</p>:
     <div className={classes.listDiv}>
    <ul className={classes.list}>
      {!cardType?postsList.map((e)=>
    ( <Link className={classes.link} to={{pathname:`/post_details/${e.id}`,
         
        state:{
        id:e.id,
        userId:id,
        title:e.title,
        content:e.content,
        thumbnail:e.thumbnail,
        userName:e.userName,
        profile:e.profile,
        category:e.category,
        createdAt:e.createdAt.getDate()+"/"+(e.createdAt.getMonth()+1)+"/"+e.createdAt.getFullYear(),
        likeList:e.likes,
        dislikeList:e.dislikes,
        likeCounter:e.likes.length,
        dislikeCounter:e.dislikes.length
       }}}><MediumCard className={classes.li}  key={e.id} imgSrc={e.thumbnail||''} userName={e.userName}
       profile={e.profile} title={e.title} createdAt={e.createdAt.getDate()+"/"+(e.createdAt.getMonth()+1)+"/"+e.createdAt.getFullYear()} />
       </Link>)):postsList.map((e)=>
    ( <Link className={classes.link} to={{pathname:`/profile/${e.id}`,
        state:{
          profile:e.profile,
          id:e.id,
          userName:e.userName,
          caption:e.caption,
          fullName:e.fullName,
          followers:e.followers,
          following:e.following,
          flag:true
       }}}> <SmallCard profile={e.profile} userName={e.userName} caption={e.caption}/>
       </Link>))}
       
    
    </ul>
    {pages.map((e,index)=>(<PageItem onClick={()=>{
          setPageNumber(index);
    console.log("The index"+index);
    }}>{index+1}</PageItem>))}
    </div>
   }
   </>
  //  </div>
    )
}



export default SearchByKeyword;