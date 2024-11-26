import React, { useState } from 'react';
import SkillSelector from '../SkillSelector/SkillSelector';

const Project = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [skill, setSkill] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [assignment, setAssignment] = useState('');
  const [assignmentDesc, setAssignmentDesc] = useState('');
  const [domain, setDomain] = useState('');
  
  const skills = [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'Ruby',
    'Go',
    'Custom'
  ];

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill === 'Custom') {
      setIsCustom(true);
      setSkill('');
    } else {
      setIsCustom(false);
      setSkill(selectedSkill);
    }
  };

  const handleCustomSkillChange = (e) => {
    setCustomSkill(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-lg font-semibold text-gray-800 mb-2'>
            Name:
          </label>
          <input
            type='text'
            placeholder='User Name'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        

        

        <div className='mb-4'>
          <label className='block text-lg font-semibold text-gray-800 mb-2'>
            File:
          </label>
          <input
            type='file'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            onChange={handleFileChange}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-lg font-semibold text-gray-800 mb-2'>
            Assignment:
          </label>
          <input
            type='file'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            onChange={(e) => setAssignment(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-semibold text-gray-800 mb-2'>
            Assignment Description:
          </label>
          <textarea
            type='text'
            placeholder='Assignment Description'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            onChange={(e) => setAssignmentDesc(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-semibold text-gray-800 mb-2'>
            Domain:
          </label>
          <input
            type='text'
            placeholder='Domain'
            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>

        <div className="mb-4">
        <SkillSelector
          skills={skills}
          skill={skill}
          customSkill={customSkill}
          isCustom={isCustom}
          handleSkillChange={handleSkillChange}
          handleCustomSkillChange={handleCustomSkillChange}
        />
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          >
            Submit Project
          </button>
        </div>

      </form>
    </div>
  );
};

export default Project;
