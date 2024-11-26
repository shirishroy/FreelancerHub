import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function Uploader({ type }){

    const user = useSelector((state)=>state.user.user);

    const inputRef = useRef();
    const [file, setFile] = useState(null);
    const [fileLink, setFileLink] = useState(null);

    const dispatch = useDispatch();

    async function handleUpload(e){
        setFile(e.target.files[0]);
        if(type === 'image/*'){
            setFileLink(URL.createObjectURL(e.target.files[0]));
        }
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const response = await axios.post('http://localhost:3000/upload', formData);
        setFileLink(response.data.url);
        
        if(type === "image/*"){
            dispatch(uiActions.setImageLink({ value : response.data.url }));
        }
        else{
            dispatch(uiActions.setResumeLink({ value : response.data.url }));

        }

        if(type === "application/pdf"){
            const response2 = await axios.post('http://localhost:3000/extractSkills', formData);
            const skillsEncoded = response2.data.generatedContent;
            console.log(skillsEncoded);
            const skills = JSON.parse(skillsEncoded).Skills || JSON.parse(skillsEncoded).skills || [];
            console.log(skills);

            if(Array.isArray(skills)){
                dispatch(uiActions.setSkillSelectorContent({ value : skills }));
            }
        }
    }

    return (
        <>
            <h1 className="">{ type === 'application/pdf' ? 'Resume:' : 'Profile Image:' }</h1>
            <input type="file" 
            ref={inputRef} 
            onChange={handleUpload} 
            accept={type}
            hidden/>
            {/* Preview File */}

            {type === "image/*" && fileLink && <img src={fileLink} alt="Image-Preview" className="rounded-full h-[250px] w-[250px] overflow-hidden"/>}
            {type === "application/pdf" && fileLink &&            
            <div className="p-3">{fileLink}</div>
            }

            {!fileLink && <button className="btn btn-primary" onClick={()=>{
                inputRef.current.click();
            }}> Upload </button>}
        </>
    )
}