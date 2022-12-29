import OptionItem from "../optionItem/OptionItem"
import classes from './OptionList.module.css'
const list=[
   {name:"בחר אופציה",
  id:'n0'},
   {name:"מוזיקה",
    id:'n1'},
    {name:"אומנות",
    id:'n2'},
    {name:"אסטרולוגיה",
    id:'n3'},
    {name:"טיפוח ויופי",
    id:'n4'},
    {name:"פיננסים",
    id:'n5'},
    {name:"אהבה",
    id:'n6'},
    {name:"מדיה ותקשורת",
    id:'n7'},
    {name:"רפואה",
    id:'n8'},
    {name:"הורות",
    id:'n9'},
    {name:"מדעי הנפש",
    id:'n10'},
    {name:"מדע וטכנולוגיה",
    id:'n11'}
]

const OptionList=(props)=>{
   return(
<div>
   <select className={classes.select} name="category" onChange={props.onChange} value={props.value}>
   {list.map((e)=>(<OptionItem name={e.name} key={e.id} />))}
   </select> 
</div>
   )
}

export default OptionList;