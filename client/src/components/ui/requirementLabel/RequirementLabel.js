import { PinDropSharp } from '@material-ui/icons';
import classes from './RequirementLabel.module.css'
const RequirementLabel=(props)=>{
return(
    <>
    <label className={classes.label}><span className={classes.astriks}>*</span>{props.children}</label>
    </>
)
}

export default RequirementLabel;