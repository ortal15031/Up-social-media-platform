import {Link} from 'react-router-dom'
import classes from './Button.module.css'
const Button=(props)=>{
    const classBtn=`${classes.link}`+" "+props.className;
    return (
   <Link to={props.to} text={props.text} className={classes.link} onClick={props.onClick}>{props.children}</Link>
    )
}

export default Button;