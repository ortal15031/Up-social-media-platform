import PageWrapper from "../../ui/pageWrapper/PageWrapper";
import classes from './Login.module.css'
import lock from '../../../images/lock.png'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signup } from "../../../slices/AuthSlice";
import {useState} from 'react'
import { useSelector } from "react-redux";
import SmallButton from '../../ui/smallButton/SmallButton';
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs';
const initialState={email:'',password:''};
const Login=()=>{
  const email=useSelector(state=>state?.auth?.email);
  const id=useSelector(state=>state?.auth?.id);
  const userName=useSelector(state=>state?.auth?.userName);
  const fullName=useSelector(state=>state?.auth?.fullName);
  console.log("The email is here "+email);
  console.log("The id is here "+id);
  console.log("The FULLnAME is here "+fullName);
  console.log("The userName is here "+userName);

  const history=useHistory();
  const dispatch=useDispatch();
  const[showPassword,setShowPassword]=useState(false);


  let cookieAuth=document.cookie;
  if(cookieAuth&&cookieAuth!=''){
                  console.log('The result is'+email)

    history.push('/');

  }
  // useEffect(()=>{
  //   if(data&&data!=''){
  //     dispatch(authActions.createProfileUser(data));
  //     console.log("The data user="+user)
  //   }
  // },[data])
  // console.log("The dattaaa"+" "+data._id);

     const [formData,setFormData]=useState(initialState);
     const submitHandler=(e)=>{
        e.preventDefault();
       dispatch(signup({formData})).unwrap().then((originalPromiseValue)=>{
          console.log("The token is:"+originalPromiseValue);
          // let flag=false;
              // setData(originalPromiseValue);
              console.log("id:"+originalPromiseValue._id);
              console.log("email:"+originalPromiseValue.email);
              console.log("userName"+originalPromiseValue.userName);
              console.log("follow"+originalPromiseValue.following);
              console.log("followers"+originalPromiseValue.followers);
              const [id,fullName,userName,email]=[originalPromiseValue._id,originalPromiseValue.fullName
                ,originalPromiseValue.userName,originalPromiseValue.email]
          

              if(originalPromiseValue&&originalPromiseValue._id!=''&&originalPromiseValue.fullName!=''
              &&originalPromiseValue.userName!=''&&originalPromiseValue.email!=''){
              // dispatch(authActions.createProfileUser({id,fullName,userName,email}));
              
                  window.location.reload(false);
              }
            }).catch((errorRecieved)=>{
              console.log(errorRecieved);
            })
              
         }
     const onChangeHandler=(e)=>{
        setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
     }
     const showPassHandler=(e)=>{
      setShowPassword(prev=>!prev);
   }
    return( 
        <div className={classes.container}>
        <div className={classes.box}>
            <div className={classes.main}>
            <img src={lock} className={classes.icon}/>
           <h1 className={classes.title}>התחברות</h1>
            </div>
            <form onSubmit={submitHandler}>
            <div className={classes.inputs}>
            <input type="text" placeholder="אימייל" name="email" className={classes.input} onChange={onChangeHandler} value={formData.email}/>
            <div className={classes.passDiv} >
            <span onClick={showPassHandler} className={classes.span}>{showPassword?<BsEyeFill className={classes.eyeIcon}/>:<BsEyeSlashFill className={classes.eyeIcon}/>}</span>
            <input type={showPassword?"text":"password"} placeholder="סיסמא" name="password" className={classes.input} onChange={onChangeHandler} value={formData.password}/>
            </div>
            </div>
         <SmallButton type="submit" className={classes.button}>התחברות</SmallButton> 
            </form>
        </div>
        </div>
        )
}

export default Login;