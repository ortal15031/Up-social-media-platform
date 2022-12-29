import {CiPaperplane} from 'react-icons/ci'
import {CiShoppingTag} from 'react-icons/ci'
import classes from './ProfileNavBar.module.css'
import {useState,useEffect} from 'react'
import PostList from '../../Post/PostList/PostList'
const ProfileNavBar=(props)=>{
    const[postsClicked,setPostsClick]=useState(false);
    const[savedClicked,setSavedClicked]=useState(false);
    useEffect(()=>{
        props.onLoadPosts(postsClicked);
    },[postsClicked])
    const clickPostsHandler=()=>{
        setPostsClick(true);
        if(savedClicked){
            setSavedClicked(false);
        }
        }
        const clickSavedHandler=()=>{
       setSavedClicked(true);
       if(postsClicked){
        setPostsClick(false);
       }
        }
    return(
        <>
        <div className={postsClicked?classes.userPostsActive:classes.userPosts} onClick={clickPostsHandler}>
        <span className={classes.postsTxt}>פוסטים</span>
        <CiPaperplane className={classes.icon}/>
        </div>
        <div className={savedClicked?classes.savedPostsActive:classes.savedPosts} onClick={clickSavedHandler}>
            <span className={classes.postsTxt}>שמורים</span>
            <CiShoppingTag className={classes.icon}/> 
        </div>
        </>
    )
}

export default ProfileNavBar;