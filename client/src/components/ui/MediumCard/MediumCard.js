import classes from './MediumCard.module.css';
import {BsFillCalendarCheckFill} from 'react-icons/bs';
import {AiFillEdit,AiFillDelete} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {deletePost} from '../../../slices/PostSlice';
const MediumCard=(props)=>{

    return(<div className={classes.card}>
    <div className={classes.rightDiv}>
        <div className={classes.descrptionFrame}>
     <img src={props.imgSrc} className={classes.descriptionImg}/>
        </div>
        </div>
        <div className={classes.midDiv}>
        <div className={classes.userDetails}>
         <p className={classes.userName}>{props.userName}</p>
        <div className={classes.frame}>
        <img src={props.profile} style={{objectFit: 'fill'}} className={classes.profile}/>
        </div>
        </div>
        <p className={classes.title}>{props.title}</p>
        <div className={classes.date}>
        <BsFillCalendarCheckFill className={classes.calendar}/>
                <p className={classes.postedDate}>{props.createdAt}
               </p>
        </div>
        </div>
         </div>) 
}

export default MediumCard;