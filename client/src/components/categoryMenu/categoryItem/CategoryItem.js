
import classes from './CategoryItem.module.css'
import {Link} from 'react-router-dom'
const CategoryItem=(props)=>{
    return(
        <Link className={classes.link} to={props.to}>
        <div className={classes.icon}><img src={props.iconName} className={classes.fa}/></div>
        <div className={classes.name}><span className={classes.categoryName}>{props.name}</span></div>
        </Link>
    )
}

export default CategoryItem; 