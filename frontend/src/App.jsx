import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import FreelancerDetail from './Components/ActiveJobTwo/FreelancerDetail';
import Jobs from './Components/FindJobF/jobs';
import Applicant from './Components/ActiveJobOne/Applicant';
import JobDescription from '../src/Components/FindJobS/jobsDesc'
import SignInPage from './routes/signIn';
import SignUpPage from './routes/signUp';

import Project from './Components/Form/Project';
import UserForm from './Components/Form/UserForm';
import Quiz from './Components/Quiz/Quiz';
import Uploader from './Components/Uploader/Uploader';
import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import SkillSelector from './Components/SkillSelector/SkillSelector';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/user-slice';
import axios from 'axios';

function App() {

  const user = useSelector(state => state.user.user);
  const { isSignedIn, userId } = useAuth();
  const dispatch = useDispatch();

  const getUserData = async ()=>{
    try{
      const response = await axios.post('http://localhost:3000/user/getUser',{
        clerkId : userId
      });
      const user = response.data.user;
      if(user){
        dispatch(userActions.setUser({ value : user }));
      }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(isSignedIn && !user){
      getUserData();
    }
  },[isSignedIn]);

  useEffect(()=>{
    console.log(user);
  },[user]);

  return (
      <Router>
        <header>
        <Navbar />
      </header>
         <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/apply" element={<FreelancerDetail />} />
          <Route path='/findjob' element={<Jobs/>}/>
          <Route path='/activejob' element={<Applicant/>}/>
          <Route path='/demo' element={<Uploader type="application/pdf" />} />
          {/* <Route path='/demo' element={<Uploader type="image/*" />} /> */}
          {/* <Route path='/demo' element={<SkillSelector />} /> */}
          <Route path="/job/:id" element={<JobDescription />} />
     <Route path='/activejob' element={<Applicant/>}/>
          <Route path='/demo' element={<Uploader type="application/pdf" />} />
        <Route path='/project' element={<Project/>}/>
     <Route path='/profile' element={<UserForm/>}/>
     <Route path='/projectuser' element={<UserForm/>}/>
     <Route path='/contest' element={<Quiz/>}/>

     </Routes>
         <Footer />
      </Router>
  );
}

export default App;


