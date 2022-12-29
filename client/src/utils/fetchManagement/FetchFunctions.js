// import { useEffect,useState } from 'react';
// import {useDispatch} from 'react-redux';
// import {fetchUserInfo, fetchAllPosts} from '../../slices/PostSlice';

// // const[page,setPageNumber]=useState(0);
// const FetchFunctions=(page,value)=>{
//     const dispatch=useDispatch();
// const[postsList,setPostsList]=useState([]);
// const[totalPages,setTotalPages]=useState(0);
// // const [page,setPage]=useState(0);
// let flag=false;
//  const getU=()=>{

// }  
// const getP=()=>{

// } 
//  const getAllU=()=>{
    

// }
// if(value===1){
//  const getAllP=(page)=>{
// // useEffect((page)=>{
//         setPostsList([]);
//           dispatch(fetchAllPosts({page}))
//           .unwrap()
//          .then((originalPromiseResults)=>{
//              console.log("thte "+" "+originalPromiseResults);
//              originalPromiseResults.data.length>0?flag=true:flag=false;
//              originalPromiseResults.data.forEach(element => {
//             console.log(postsList.length);
//             let id=element.user;
//             dispatch(fetchUserInfo({id})).unwrap()
//             .then((originalPromiseResults)=>{
//               console.log("The user Name is"+originalPromiseResults);
//               setPostsList(prev=>[...prev,{id:element._id,
//                 title:element.title,
//               category:element.category,
//               content:element.content,
//               thumbnail:element.thumbnail,
//               createdAt:element.createdAt,
//               userName:originalPromiseResults.userName,
//               profile:originalPromiseResults.profile
//             }])
//             })
//              });
//              setTotalPages(originalPromiseResults.totalPages);
//              return({postsList,totalPages,flag});
//           }).catch((err)=>{
//              console.log(err.message)
//           });
            
//       }
//     }

//     }
//     export default FetchFunctions;


