import React,{useRef,useState,useEffect} from 'react'
import Button from './Button'
import "./ImageUpload.css"
export default function ImageUpload(props) {
    const [file, setfile] = useState();
    const [previewURL, setpreviewURL] = useState();
    const [isValid, setisValid] = useState(false)
    const filePickerRef=useRef();
    useEffect(() => {
        if(!file) return ;
       const filerReader=new FileReader();
       filerReader.onload=()=>{
           setpreviewURL(filerReader.result)

       };
       filerReader.readAsDataURL(file)
    }, [file])
    const pickImageHandler=()=>{
        filePickerRef.current.click()

    }
    const pickHandler=(e)=>{
        console.log(e.target);
        let pickedFile;
        let fileisValid;
        if(e.target.files&&e.target.files.length===1)
        {
            pickedFile=e.target.files[0];
            setfile(e.target.files[0])
            setisValid(true);
            fileisValid=true
        }
        else{
            setisValid(false);
            fileisValid=false
        }
        props.onInput(props.id,pickedFile,fileisValid)

    }
    return (
        <div className="form-control">
            <input type="file" accept=".jpg,.png,.jpeg" id={props.id} style={{display:'none'}} ref={filePickerRef} onChange={pickHandler}/>
            <div className={`image-upload ${props.center&&'center'}`}>
                <div className="image-upload__preview">
                  { previewURL&& <img src={previewURL} alt="preview"/>}
                  {!previewURL&&<p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>

            </div>
            {!isValid&&<p>{props.errorText}</p>}
            
        </div>
    )
}
