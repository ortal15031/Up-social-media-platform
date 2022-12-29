import classes from './PageWrapper.module.css'
const PageWrapper=(props)=>{
    const wrapperClass=`${classes.mainWrapper}`+" "+props.className;
        return(
        <div className={wrapperClass}>{props.children}</div>
    )
}

export default PageWrapper;