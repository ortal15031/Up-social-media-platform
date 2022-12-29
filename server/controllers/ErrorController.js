import ErrorHandling from '../utilities/ErrorHandling.js'

const sendDevErr=(err,req,res,next)=>{

 res.status(err.statusCode).json({
    name:err.name,
    code:err.code,
    status:err.status,
    message:err.message,
    stack:err.stack
 })
}
const handleCastErrorDB=(error)=>{
    error.message="data already exists";
    return new ErrorHandling(error.message,error.statusCode);
  }
  const handleDuplicateFields=(error)=>{
    let value=error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    error.message=`There is another tour with the value ${value} you entered
    please try another one`
    return new ErrorHandling(error.message,error.statusCode);
  }

  const handleJsonWebTokenError=(error)=>{
    return new ErrorHandling('Token is incorrect. Please loggin',error.statusCode);
  }
  const handlerTokenExpiredError=(error)=>{
  return new ErrorHandling('Your token had expires.Please loggin again',error.statusCode);
  }
  const sendErrorProd=(err,req,res,next)=>{
    if(err.isOperational){
     res.send(500).json({
      status:"fail",
      message:"Something went wrong"
     })
  
    }
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message
    })
  }
const ErrorController=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||"error";
if(process.env.NODE_ENV='development'){
    sendDevErr(err,req,res,next);
}

else if(process.env.NODE_ENV==='production'){
    let error={...err};
    if(error.name=='CastError'){
      error=handleCastErrorDB(error);
    }
    if(err.code===11000){
      error=handleDuplicateFields(error);
    }
    if(err.name==='JsonWebTokenError'){
    error=handleJsonWebTokenError(error);
    }
  
    if(err.name==='TokenExpiredError'){
      error=handlerTokenExpiredError(error);
    }
    sendErrorProd(error,req,res,next);

  }
}


export default ErrorController;