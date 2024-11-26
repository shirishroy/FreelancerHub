import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/ui-slice";

export default function SkillSelector(){

    const dispatch = useDispatch();
    const skills = useSelector((state)=>state.ui.skillSelectorContent);

    const setSkills = (newSkills)=>{
        dispatch(uiActions.setSkillSelectorContent({ value : newSkills}))
    }

    const removeSkill = (skill,index)=>{
        const newSkills = skills.filter((s,i)=>i!==index && skill!==s);
        setSkills(newSkills);
    }

    const addSkill = (skill)=>{
        const newSkills = [...skills,skill];
        setSkills(newSkills);
    }

    return <>
        <div className="flex m-2 gap-2 flex flex-wrap">
            {
                skills.map((skill,index)=>{
                    return <div key={index} className="flex gap-1 px-3 py-1 items-center bg-slate-200 rounded-full whitespace-nowrap">
                        <div className="p-1" >{skill}</div>
                        <div onClick={()=>{
                            removeSkill(skill,index)
                        }}
                        className="hover:bg-red-100 px-2 cursor-pointer rounded-full"
                        >X</div>
                    </div>
                })
            }
        </div>
        <div className="flex">
            <div className="p-3 font-bold">
                Skills
            </div>
            <input className="py-3 px-2 border-bottom  border-2"
            placeholder="Enter , seperated values" 
            onKeyDown={(e)=>{
                if(e.key==="Enter" || e.key==="Tab" || e.key===","){
                    addSkill(e.target.value)
                    e.target.value = "";
                }
            }}
            />
        </div>
    </>
}