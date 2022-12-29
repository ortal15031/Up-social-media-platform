import classes from './DropDownItem.module.css';
const DropDownItem=(props)=>{
return(
<div className={classes.mainDiv}>
<img src={props.img} className={classes.img}/>
<span className={classes.userName}>{props.userName}</span>
</div>
    )
}

export default DropDownItem;