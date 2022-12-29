import classes from './SmallCard.module.css'

const SmallCard=(props)=>{
    return(<div className={classes.card}>
        <div className={classes.rightDiv}>
            <div className={classes.descrptionFrame}>
         <img src={props.profile} className={classes.descriptionImg}/>
    
            </div>
            </div>
            <div className={classes.midDiv}>
            <div className={classes.userDetails}>
         <p className={classes.userName}>{props.userName}</p>
            </div>
            <div className={classes.description}>
            <p className={classes.captionTxt}>{props.caption}</p>          
            </div>
            </div>
             </div>)
}


export default SmallCard;