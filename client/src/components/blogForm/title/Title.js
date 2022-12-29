import classes from './Title.module.css'
import RequirementLabel from '../../ui/requirementLabel/RequirementLabel';
const Title=(props)=>{
    return(
        <>
        <RequirementLabel>כותרת</RequirementLabel>
        <label>{props.originTitle}</label>
        <input type="text" placeholder="תן שם לפוסט" className={classes.input} name="title" onChange={props.onChange}
          value={props.value}></input>
      </>
    )
}


export default Title;