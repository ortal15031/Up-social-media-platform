import classes from './SignUp.module.css'
import PageWrapper from '../../ui/pageWrapper/PageWrapper'
import lock from '../../../images/lock.png'
import {useState,useEffect} from 'react'
import {connect,useDispatch,useSelector} from 'react-redux'
import { userActions } from '../../../slices/UserSlice'
import {register} from '../../../slices/AuthSlice'
import { useHistory } from 'react-router-dom'
import SmallButton from '../../ui/smallButton/SmallButton';
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs';
import { Flag } from '@material-ui/icons'
const initialState={
    fullName:'',
    userName:'',
email:'',password:'',confirmPassword:''};
const SignUp=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const[formData,setFormData]=useState(initialState);
    const { fullName, userName, email, password, confirmPassword } = formData;
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirm,setShowConfirm]=useState(false);
    const submitHandler=(e)=>{
    e.preventDefault();
    console.log(formData);
    if(formData.password!==formData.confirmPassword){
     history.push('/')
    }
    if(
        formData.fullName!=''&&formData.userName!=''&&formData.email!=''
        &&formData.password!=''&&formData.confirmPassword!=''){
     if(!(/\S+@\S+\.\S+/).test(formData.email)){
     console.log("כתובת האימייל אינה תקנית");
     return;
     }
     if(formData.password.length<6||!(/[A-Za-z]/).test(formData.password)||(/\s/).test(formData.password)){
        console.log("הסיסמא שהזנת אינה עומדת בתקנים. . על הסיסמא להיות באורך של 6 תווים לפחות וללא רווחים,על הסיסמא להכיל לפחות אות אחת בלועזית")
        return; 
    
    }
     
     if(formData.password!=formData.confirmPassword){
        console.log("שני השדות של הסיסמא אינם זהים");
        return;
     }
     dispatch(register({formData}))
     .unwrap()
    .then((originalPromiseResults)=>{
        console.log("User signed in successfully");
        history.push('/login')
     }).catch((err)=>{
        console.log(err.message);
     })

    }else{
        console.log("משהו השתבש")
    }
}

const changeHandler= (e)=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}));      
     }
     const showPassHandler=(e)=>{
        setShowPassword(prev=>!prev);
     }
     const showConfirmHandler=(e)=>{
      setShowConfirm(prev=>!prev)
     }
 
    return(
    <div className={classes.container}>
    <div className={classes.box}>
        <div className={classes.main}>
        <img src={lock} className={classes.icon}/>
       <h1 className={classes.title}>הרשמה</h1>
        </div>
        <form onSubmit={submitHandler}>
        <div className={classes.inputs}>
        <input type="text" name='fullName' placeholder="שם מלא" className={classes.input} onChange={changeHandler} value={fullName}/>
        <input type="text" name='userName' placeholder="שם משתמש" className={classes.input} onChange={changeHandler} value={userName}/>
        <input type="text" name='email' placeholder="אימייל" className={classes.input} onChange={changeHandler} value={email}/>
        <div className={classes.passDiv} >
        <span onClick={showPassHandler} className={classes.span}>{showPassword?<BsEyeFill className={classes.eyeIcon}/>:<BsEyeSlashFill className={classes.eyeIcon}/>}</span>
        <input type={showPassword?'text':'password'} name='password' placeholder="סיסמא" className={classes.input} onChange={changeHandler} value={password}/>
        </div>
        <div className={classes.passDiv} >
        <span onClick={showConfirmHandler} className={classes.span}>{showConfirm?<BsEyeFill className={classes.eyeIcon}/>:<BsEyeSlashFill className={classes.eyeIcon}/>}</span>
        <input type={showConfirm?'text':'password'} name='confirmPassword' placeholder="סיסמא חוזרת" className={classes.input} onChange={changeHandler} value={confirmPassword}/>
           
        </div>

        </div>
            <SmallButton type="submit" className={classes.button}>הרשמה</SmallButton>
        </form>
    </div>
    </div>)
}


export default SignUp;
