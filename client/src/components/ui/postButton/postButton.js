import {Link} from 'react-router-dom'
import classes from './postButton.module.css'
const postButton=(props)=>{
    return(<Link className={classes.link} to={props.to}>{props.children}</Link>)
}

export default postButton;
