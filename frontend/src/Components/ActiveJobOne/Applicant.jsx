import React, { useState } from "react";
import "./Applicant.scss";
import img from "../../images/AiArtist.webp";
import img2 from "../../images/bookcovers.webp";
import img3 from "../../images/translation.webp";
import img4 from "../../images/dataentry.webp";
import FreelancerDetail from "../ActiveJobTwo/FreelancerDetail"; // Import the FreelancerDetail component
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { dataActions } from "../../store/data-slice";
import { useEffect } from "react";

const Applicant = () => {
    // Sample data for testing
    const jobsposted = [
        { id: 1, title: "Job 1", name: "Aman" },
        { id: 2, title: "Job 2", name: "John" },
        { id: 3, title: "Job 3", name: "Alice" },
        { id: 4, title: "Job 4", name: "Emma" },
        { id: 5, title: "Job 5", name: "David" },
        { id: 6, title: "Job 6", name: "Sophia" },
        { id: 7, title: "Job 7", name: "Oliver" },
        { id: 8, title: "Job 8", name: "Charlotte" },
        { id: 9, title: "Job 9", name: "Charlotte" },
        { id: 10, title: "Job 10", name: "Charlotte" },
        { id: 11, title: "Job 11", name: "Charlotte" },
        { id: 12, title: "Job 12", name: "Charlotte" }
    ];

    const jobs = useSelector(state => state.data.jobs);
    const dispatch = useDispatch();

    const getJobsData = async ()=>{
        try {
            const response = await axios.get('http://localhost:3000/job/getAll');
            if(response.data.success){
                dispatch(dataActions.setJobs({ value : response.data.jobs }));
                // setIsLoading(false);
            }
            throw new Error(response.data.err);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(jobs.length === 0){
            getJobsData();
        }
    }, []);

    // const applicantData = [
    //     { id: 1, jobId: 1, name: "Aman Singh", img: img, rating: 4.5, description: "Experienced AI artist specializing in creating stunning visuals  AI artist specializing in creating stunning visuals  AI artist specializing in creating stunning visuals." },
    //     { id: 2, jobId: 1, name: "Vivek Aggrawal", img: img2, rating: 4.0, description: "Expert in book cover designs with a focus on fantasy and sci-fi genres.  AI artist specializing in creating stunning visuals AI artist specializing in creating stunning visuals" },
    //     { id: 3, jobId: 2, name: "Mritunjay Singh", img: img3, rating: 4.2, description: "Professional translator with proficiency in multiple languages." },
    //     { id: 4, jobId: 2, name: "Shirish", img: img4, rating: 3.8, description: "Data entry specialist with a keen eye for detail and accuracy." },
    //     { id: 5, jobId: 2, name: "Ved", img: img4, rating: 3.8, description: "Skilled in data entry and management, ensuring high-quality results." }
    // ];

    const [applicantData, setApplicantData] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const getApplicants = async ()=>{
        const response = await fetch('http://localhost:3000/application/get',{
            method : 'POST',
            body : JSON.stringify({
                projectId : selectedJobId
            })
        })
        const res = await response.json();
        console.log(res);
        setApplicantData(res.applications);
    }

    useEffect(()=>{
        getApplicants();
    },[selectedJobId])



    const [selectedApplicant, setSelectedApplicant] = useState(null); // State for selected applicant

    const applicantsForSelectedJob = applicantData.filter(applicant => applicant.jobId === selectedJobId);

    return (
        <div className="container-fluid bg-black py-5 zindex">
            <div className="row justify-content-center jobhosted">
                <div className="col-md-3 sticky-top left bg-dark text-white overflow-auto rounded-4 p-3" style={{ maxHeight: "calc(100vh - 100px)" }}>
                    <h2 className="pb-3 px-3">Job Posted</h2>
                    <div className="job-list">
                        {jobs.map(job => (
                            <div className="job-item" key={job._id} onClick={() => setSelectedJobId(job._id)}>
                                <h5 className="jobtitle">{job.name}</h5>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-5 right bg-dark text-white sticky-top overflow-auto p-3" style={{ top: 0, maxHeight: "calc(100vh - 100px)" }}>
                    {selectedApplicant ? (
                        <FreelancerDetail  applicant={selectedApplicant} onClose={() => setSelectedApplicant(null)}  />
                    ) : (
                        <div className="applicant-details">
                            {applicantsForSelectedJob.map((applicantItem, index) => (
                                <div className="applicant-profile" key={index} onClick={() => setSelectedApplicant(applicantItem)}>
                                    <img className="img-fluid applicantimg" src={applicantItem.img} alt={applicantItem.name} />
                                    <div>
                                        <h5>{applicantItem.name}</h5>
                                        <div className="clientbtns my-2 d-flex justify-content-between">
                                            <div>
                                                <button style={{ fontWeight: "500" }} className="p-2 mx-1 rounded cliendbtn cv checkCV">
                                                    Download CV <i style={{ fontWeight: "600" }} className="text-white bi bi-arrow-down-square-fill"></i>
                                                </button>
                                            </div>
                                            <div>
                                                <button style={{ fontWeight: "500" }} className="mx-3 rounded cliendbtn rightsidecliendbtn chat chatnow">
                                                    <i style={{ fontWeight: "600" }} className="text-white bi bi-chat-left-dots-fill"></i>
                                                </button>
                                                <button style={{ fontWeight: "500" }} className="mx-3 rounded cliendbtn rightsidecliendbtn meeting">
                                                    <i style={{ fontWeight: "600" }} className="text-white bi bi-camera-video-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="rating">
                                        Rating: {Array(Math.max(0, Math.floor(applicantItem.rating))).fill().map((_, index) => (
                                            <i key={index} className="bi bi-star-fill stars mx-1"></i>
                                        ))}
                                    </p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applicant;
