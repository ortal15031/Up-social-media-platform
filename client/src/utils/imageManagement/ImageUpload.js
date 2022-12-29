import {CLOUD_NAME,UPLOAD_PRESET} from '../../credentials/Credentials'
export const CheckImage = (file) => {
    const types = ['image/png', 'image/jpeg']
    let err = ''
    if(!file) return err = "File does not exist."
  
    if(file.size > 1024 * 1024) 
      err = "The largest image size is 1mb"
  
    if(!types.includes(file.type))
      err = "The image type is png / jpeg"
  
    return err;
  }
  
  export const ImageUpload = async (file) => {
    try{
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("cloud_name", CLOUD_NAME)
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    })
  
    const data = await res.json()
    return { public_id: data.public_id, url: data.secure_url };
}catch(err){
    console.log(err.message);
}
  }
