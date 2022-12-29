import classes from './SmallButton.module.css';

const SmallButton=(props)=>{
    const classBtn=`${classes.btn}`+" "+props.className;

    return(<button className={classBtn} type={props.type}>{props.children}</button>)
}

export default SmallButton;