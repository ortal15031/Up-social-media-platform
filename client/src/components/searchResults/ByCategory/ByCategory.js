import classes from './ByCategory.module.css';
import {useEffect,useState} from 'react';
import {fetchPostsByCategory} from '../../../slices/PostSlice';
import { fetchUserInfo } from '../../../slices/UserSlice';
import PageItem from '../../ui/pageItem/PageItem';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation,Link } from 'react-router-dom';
import MediumCard from '../../ui/MediumCard/MediumCard';
const ByCategory=()=>{
 const dispatch=useDispatch(); 
 const location=useLocation();
 const[postsList,setPostsList]=useState([]);
 const[totalPages,setTotalPages]=useState(0);
 const[page,setPageNumber]=useState(0);
 const {category}=location.state;  
 const pages=new Array(totalPages).fill(null).map((e,index)=>index);
const connectedUser=useSelector(state=>state?.reducer?.auth?.id);
 let flag=false;
useEffect(()=>{
    setPostsList([]);
    dispatch(fetchPostsByCategory({category,page}))
    .unwrap()
   .then((originalPromiseResults)=>{
    console.log(originalPromiseResults.data);
    originalPromiseResults.data.length>0?flag=true:flag=false;
    originalPromiseResults.data.forEach(element => {
        console.log(postsList.length);
        let id=element.user;
        dispatch(fetchUserInfo({id})).unwrap()
        .then((originalPromiseResults)=>{
          console.log("The user Name is"+originalPromiseResults);
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
        }])
        })
    })
    setTotalPages(originalPromiseResults.totalPages);

    }).catch((err)=>{
       console.log(err.message)
    });
},[]);

return(
<>
{  !{flag} ?<p>אין פוסטים זמינים</p>:
    <div className={classes.listDiv}>
   <ul className={classes.list}>
     {postsList.map((e)=>
    <Link className={classes.link} to={{pathname:`/post_details/${e.id}`,
      state:{
        id:e.id,
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
      }}}> <MediumCard  className={classes.li}  key={e.id} imgSrc={e.thumbnail||''} userName={e.userName}
      profile={e.profile} title={e.title} createdAt={e.createdAt.getDate()+"/"+(e.createdAt.getMonth()+1)+"/"+e.createdAt.getFullYear()} />
      </Link>)
      }
   
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


export default ByCategory;