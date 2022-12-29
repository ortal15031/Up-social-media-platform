import multer from 'multer';
import path from 'path';
const storage=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'../../client/public/uploads')
  },
  filename:(req,file,callback)=>{
    callback(null,path.extname(file.originalname))
  }
})
export const upload=multer({storage:storage});

