import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import SkillSelector from '../SkillSelector/SkillSelector';
import { useDispatch, useSelector } from 'react-redux';
import Uploader from '../Uploader/Uploader';
import { uiActions } from '../../store/ui-slice';
import { userActions } from '../../store/user-slice';
import axios from 'axios';

const UserForm = () => {

  const { isSignedIn, userId } = useAuth();

  const data_user = useSelector((state)=> state.user.user);
  const skills = useSelector((state)=>state.ui.skillSelectorContent);
  const [name, setName] = useState(data_user?.name || '');
  const [email, setEmail] = useState(data_user?.email || '');
  // const [file, setFile] = useState('');
  // const [link, setLink] = useState('');
  // const [skill, setSkill] = useState('');
  // const [isCustom, setIsCustom] = useState(false);
  const resumeLink = useSelector((state)=>state.ui.resumeLink);
  const image = useSelector(state => state.ui.imageLink);

  const updateUserHandler = async () => {
    const bodyData = {
        name: name,
        email: email,
        skills: skills,
        resumeLink,
        image,
        clerkId: userId
    };

    try {
        const response = await fetch('http://localhost:3000/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const res = await response.json();
        dispatch(userActions.setUser({ value: res.user }));
    } catch (err) {
        console.log('Error:', err);
    }
};

  const dispatch = useDispatch();

  useEffect(()=>{
    if(isSignedIn && data_user){
      dispatch(uiActions.setSkillSelectorContent({ value : data_user.skills }));
    }
  },[]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      // onKeyDown={(e)=>{
      //   if(e.key==="Enter"){
      //     e.preventDefault();
      //   }      
      // }}
      > 
        <Uploader type='image/*' />
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            placeholder="User Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Email:
          </label>
          <input
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            ClerkId:
          </label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => setFile(e.target.value)}
          />
        </div> */}

        {/* <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Resume:
          </label>
          <input
            type="file"
            placeholder="Resume Link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => setLink(e.target.value)}
          />
          
        </div> */}
        <Uploader type='application/pdf' />
        <SkillSelector />
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            onClick={updateUserHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
