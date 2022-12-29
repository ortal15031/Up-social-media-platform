import banner from '../images/banner.png'
import classes from './HomePage.module.css'
import CategoryList from './categoryMenu/categoryList/CategoryList'
import PageWrapper from './ui/pageWrapper/PageWrapper'
const HomePage=()=>{
    return(
    
     <div className={classes.main}> 
    <img className={classes.banner} src={banner}/>
    <div className={classes.list}>
    <CategoryList className={classes.categories} />
    </div>
    </div> 
  
    )
}

export default HomePage;