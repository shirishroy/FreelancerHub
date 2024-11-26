import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Quiz = () => {
    const [domain, setDomain] = useState('');
    const [skills, setSkills] = useState('');
    const [questions, setQuestions] = useState([]);
    const [responses,setResponses] = useState({});
    const [isEvaluated,setIsEvaluated] = useState(false);

    function updateQuestionsAndSave(){};

    const getQuestions = async () => {
        try{
            if(domain===''){
                setDomain('-')
            }
            if(skills===''){
                setSkills('-')
            }
            const response = await axios.get(`http://localhost:3000/quiz/questions/${domain}/${skills}`);
            const data = response.data;
            if(data){
                setQuestions(data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    function selectResponse(choice,id){
        setResponses((prev)=>{
            return {
                ...prev,
                [id] : choice   
            }
        });
        console.log(responses);
    }

    return (
        <div className='p-5  justify-center text-bold bg-dark text-white'>
            <h1 className='text-xl py-3'>Quiz Generator</h1>
            <input 
            className='p-3 rounded py-2 mx-3 text-black' 
                type="text" 
                placeholder="Enter domain" 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
            />
            <input 
            className='p-3 rounded py-2 text-black'
                type="text" 
                placeholder="Enter skills (comma-separated)" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)} 
            />
            <button className='btn btn-primary p-3 mx-3' onClick={()=>{
                getQuestions();
                setIsEvaluated(false);
                setResponses({});
            }}>Generate Questions</button>

            <div>
                {questions.map(question => (
                    <div key={question.id} className='m-3 mb-[20px]'>
                        <div className='flex gap-2 text-xl'>
                            <h2>{question.id}.</h2><h3>{question.question}</h3>
                        </div>
                        <ul className='text-black bg-white'>
                            {question.choices.map((choice, index) => (
                                <li key={index} 
                                onClick={()=>{
                                    selectResponse(choice,question.id)
                                }} 
                                className={ isEvaluated ? 
                                (
                                    choice === question.correctAnswer ? "bg-green-200 w-max m-2" : (
                                        choice === responses[question.id] ? "bg-red-200 w-max m-2" : ""
                                    )
                                ) :
                                    (choice === responses[question.id] ? 'bg-sky-200 w-max m-2' : 'bg-slate-200 w-max m-2')
                                }
                                >
                                    <div className='px-[15px] py-[8px] w-max cursor-pointer'>- {choice}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div onClick={()=>{
                setIsEvaluated(true)
                updateQuestionsAndSave();
            }}>
                Submit
            </div>
        </div>
    );
};

export default Quiz;
