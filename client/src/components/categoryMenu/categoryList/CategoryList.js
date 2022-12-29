import classes from './CategoryList.module.css'
import CategoryItem from '../categoryItem/CategoryItem'
import music from '../../../images/music.png'
import art from '../../../images/art.png'
import astrology from '../../../images/astrology.png'
import beauty from '../../../images/beauty.png'
import cooking from '../../../images/cooking.png'
import finances from '../../../images/finances.png'
import love from '../../../images/love.png'
import media from '../../../images/media.png'
import medichine from '../../../images/medichine.png'
import parenting from '../../../images/parenting.png'
import psychology from '../../../images/psychology.png'
import science from '../../../images/science.png'
let list=[
{
    id:"c1",
    name:"מוזיקה",
   iconName:`${music}`
} ,
{
    id:"c2",
    name:"אומנות",
    iconName:`${art}`
},
{
    id:"c3",
    name:"אסטרולוגיה",
    iconName:`${astrology}`
},
{
    id:"c4",
    name:"טיפוח ויופי",
    iconName:`${beauty}`
},
{
    id:"c5",
    name:"בישול",
    iconName:`${cooking}`
},
{
    id:"c6",
    name:"פיננסים",
    iconName:`${finances}`
},
{
    id:"c7",
    name:"אהבה",
    iconName:`${love}`
},
{
    id:"c8",
    name:"מדיה ותקשורת",
    iconName:`${media}`
},
{
    id:"c9",
    name:"רפואה",
    iconName:`${medichine}`
},
{
    id:"c10",
    name:"הורות",
    iconName:`${parenting}`
},
{
    id:"c11",
    name:"מדעי הנפש",
    iconName:`${psychology}`
},
{
    id:"c12",
    name:"מדע וטכנולוגיה",
    iconName:`${science}`
}
];
const CategoryList=(props)=>{
    return(
        <div className={classes.main}>
    <ul className={classes.list}>
    {list.map((e)=>(<CategoryItem className={classes.item} key={e.id} name={e.name} iconName={e.iconName} to={{pathname:`/search_by_category/${e.name}`,
        state:{
        category:e.name
        }}}/>))}
    </ul>
    </div>
    )
}


export default CategoryList;