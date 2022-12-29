import {Link} from 'react-router-dom'
import Logo from '../../images/Logo.png'
import classes from './navBar.module.css'
import Search from '../search/Search'
import Button from '../ui/button/Button'
import {useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {BsBell} from 'react-icons/bs' 
import {AiOutlineMessage} from 'react-icons/ai'
import user from '../../images/user.png'
import {logout} from '../../slices/AuthSlice'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
const NavBar=(props)=>{
    const{profile,userName,following,followers,caption,id,fullName}=useSelector(state=>state?.reducer?.auth);
    const history=useHistory();
    const dispatch=useDispatch();
    let authCookie=document.cookie;
    let flag=false;
    useEffect(()=>{
    if(authCookie&&authCookie!=''){
    flag=true;
    console.log(authCookie);
    }else{
     flag=false;
    }
    },[authCookie,profile]);
    const clickHandler=()=>{
    dispatch(logout()).unwrap().then((originalPromiseValue)=>{
      console.log(originalPromiseValue);
        window.location.reload(false);
    }).catch((err)=>{
      console.log(err.message);
        })

    }
return(
    <nav>
       <ul >
       <div className={classes.myDiv}>
       {authCookie&&<div className={classes.logout}><Button onClick={clickHandler} className={classes.logoutLink} to='/'>התנתק</Button></div>}
       <div className={classes.rightElem}>
       <li className={classes.search}><Search /></li> 
       <div className={classes.mostRight}>
   {!authCookie&& <div className={classes.links}>
     <Button to='/signup'>הרשמה</Button>
     <Button to='/login'>התחברות</Button>
       </div> }
       <Link to='/'>
    <img src={Logo} className={classes.logo}></img>
    </Link>
    {authCookie&&
    <div className={classes.profile}>
    <div className={classes.icons}>
    <Link className={classes.counters}>
    <BsBell className={classes.icon}/>
    <span className={classes.numberUpdates}>2</span>
    </Link>
    <Link className={classes.counters}>
      <AiOutlineMessage className={classes.icon}/>
      <span className={classes.numberUpdates}>1</span>
    </Link>
    </div>
   <Link to={{pathname:`/profile/${id}`,
        state:{
          profile,
          id,
          userName,
          caption,
          fullName,
          followers,
          following
       }}}> 
   
   <img className={classes.profilePic} src={profile} /> </Link>
    </div>}
    </div> 
    </div>
    </div>    
    </ul>
    </nav>
)
}

export default NavBar;
