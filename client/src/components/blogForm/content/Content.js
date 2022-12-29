import ReactQuill from 'react-quill'
import classes from './Content.module.css'
import {modules,formats,pref} from './Preferences'
import {useEffect,useRef,useCallback} from 'react'
import {CheckImage,ImageUpload} from '../../../utils/imageManagement/ImageUpload'
const Content=(props)=>{

const quillRef=useRef(null);
const changeImageHandler=useCallback(()=>{
console.log("changeImage");
const input=document.createElement('input');
input.type='file';
input.accept='image/*'
input.click();
input.onchange=async()=>{
  try{
    const files=input.files;
    if(!files) return
    const file=files[0];
    const check=CheckImage(file);
    console.log(check);
    if(check){
      throw new Error("פורמט זה אינו נתמך")
    }
    const photo=await ImageUpload(file);
    const quill=quillRef.current;
    const range=quill?.getEditor().getSelection()?.index;
    if(range!==undefined){
      quill.getEditor().insertEmbed(range,'image',`${photo.url}`)
    }
  }catch(err){
    console.log(err.message);
  }
}
},[])

useEffect(()=>{
const quill=quillRef.current;
if(!quill) return;
let toolbar=quill.getEditor().getModule('toolbar');
toolbar.addHandler('image',changeImageHandler)
},[changeImageHandler])
    return( <>
      <ReactQuill
        theme="snow"
       modules={modules}
       formats={formats}
       content={pref}
       className={classes.content}
       ref={quillRef}
       onChange={props.onChange}
       name="content"
       value={props.value}
        />
        </> )
}

export default Content;