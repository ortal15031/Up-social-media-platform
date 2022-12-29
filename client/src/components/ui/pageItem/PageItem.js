import classes from './PageItem.module.css'
const PageItem=(props)=>{
    return(<button className={classes.pageBtn} onClick={props.onClick}>{props.children}</button>)
}

export default PageItem;