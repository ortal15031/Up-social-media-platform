import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
// import validator from 'validator'
const userSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:[true,"Full name is requires"]
},
userName:{
    type:String,
    required:[true,"User name is requires"],
    unique:true

},
email:{
    type:String,
    required:[true,"Email is requires"],
    unique:true,
    lowerCase:true,
    // validator:[validator.isEmail,"Please provide valid email address"]
},
password:{
    type:String,
    required:[true,"Password is requires"],
    minLength:8,
    select:false
},
 confirmPassword:{
    type:String,
    required:[true,"Confirm password is requires"],
    minLength:8,
    validate:{
        validator:function(value){
            return value===this.password
        }
    }
 },
 following:{
   type:[{type: mongoose.Types.ObjectId, ref: 'user'}],
   default:[]
 },
 followers:{
   type:[{type: mongoose.Types.ObjectId, ref: 'user'}],
   default:[]
 },
 caption:{
    type:String,
    default:'אודות'
 },
 profile:{
    type:String,
    default:"https://res.cloudinary.com/dwbu4liwk/image/upload/v1668722522/zaywquacyikybxvue91l.png"
 }
},{ minimize: false })
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcryptjs.hash(this.password,12);
    this.confirmPassword=undefined;
})

userSchema.methods.correctPassword= async function(candidatePassword,userPassword){
    return bcryptjs.compare(candidatePassword,userPassword);
}


const User=mongoose.model('User',userSchema);


export default User;