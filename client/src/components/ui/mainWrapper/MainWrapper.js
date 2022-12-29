import classes from './MainWrapper.module.css'
const MainWrapper=(props)=>{
    const wrapperClass=`${classes.MainWrapper}`+" "+props.className;
    return(
        <div className={wrapperClass}>{props.children}</div>
    )
}


export default MainWrapper;