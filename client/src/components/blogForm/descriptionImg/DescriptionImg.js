import RequirementLabel from "../../ui/requirementLabel/RequirementLabel";
import classes from './DescriptionImg.module.css'
const DescriptionImg=(props)=>{
    return(
        <>
        <RequirementLabel>תמונה (לתיאור)</RequirementLabel>
        <input type="file" className={classes.input} placeholder="העלאת תמונה" accept="image/*" className={classes.input} name="thumbnail"
            onChange={props.onChange} value={props.value}
        />
        </>
    )
}

export default DescriptionImg;