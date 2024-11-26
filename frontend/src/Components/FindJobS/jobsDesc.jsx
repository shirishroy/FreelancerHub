import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const JobDescription = () => {
    const { id } = useParams();
    const jobs = useSelector((state)=>state.data.jobs);
    const job = jobs.find((job)=>job._id===id);
    const user = useSelector((state)=>state.user.user);
    // useEffect(() => {
    //     // Simulate fetching job details by ID
    //     // const fetchJob = async () => {
    //     //     const fakeData = [
    //     //         { id: 1, title: 'Job 1', description: 'Description for job 1', domain: 'Domain 1', rating: 4, price: '$100', img: 'https://via.placeholder.com/150' },
    //     //         { id: 2, title: 'Job 2', description: 'Description for job 2', domain: 'Domain 2', rating: 3, price: '$200', img: 'https://via.placeholder.com/150' },
    //     //         { id: 3, title: 'Job 3', description: 'Description for job 3', domain: 'Domain 3', rating: 5, price: '$300', img: 'https://via.placeholder.com/150' },
    //     //         { id: 4, title: 'Job 4', description: 'Description for job 4', domain: 'Domain 4', rating: 2, price: '$400', img: 'https://via.placeholder.com/150' },
    //     //         { id: 5, title: 'Job 5', description: 'Description for job 5', domain: 'Domain 5', rating: 4, price: '$500', img: 'https://via.placeholder.com/150' },
    //     //         { id: 6, title: 'Job 6', description: 'Description for job 6', domain: 'Domain 6', rating: 3, price: '$600', img: 'https://via.placeholder.com/150' },
    //     //         { id: 7, title: 'Job 7', description: 'Description for job 7', domain: 'Domain 7', rating: 4, price: '$700', img: 'https://via.placeholder.com/150' },
    //     //         { id: 8, title: 'Job 8', description: 'Description for job 8', domain: 'Domain 8', rating: 5, price: '$800', img: 'https://via.placeholder.com/150' },
    //     //         { id: 9, title: 'Job 9', description: 'Description for job 9', domain: 'Domain 9', rating: 3, price: '$900', img: 'https://via.placeholder.com/150' },
    //     //         { id: 10, title: 'Job 10', description: 'Description for job 10', domain: 'Domain 10', rating: 2, price: '$1000', img: 'https://via.placeholder.com/150' }
    //     //     ];

    //     //     const job = fakeData.find(j => j.id === parseInt(id));
    //     //     setJob(job);
    //     // };

    //     // fetchJob();
    //     const 
    // }, [id]);

    if (!job) return <div className="text-white">Loading...</div>;

    return (
        <div className="job-description bg-dark text-white p-3">
           <div className="col-md-8 d-flex justify-content-center mx-3 px-3">
           <div className='col-md-5 d-flex flex-column'>
            <img className="img-fluid rounded" src={job.image} alt={job.title} />
            <Link to="/" className="btn btn-secondary mb-3 my-2">Back</Link>
            </div>
            <div className="col-md-5 mx-5 px-5">
                
            <h2 className='text-md font-sans font-light my-2'>{job.domain}</h2>
            <h5 className='text-2xl my-3'>{job.name}</h5>
            <p>{job.description}</p>
            <p className='text-xl font-semibold'>${job.price}</p>
            {/* <p>
                Rating: {Array(Math.floor(job.rating)).fill().map((_, index) => (
                    <i key={index} className="bi bi-star-fill stars mx-1 start"></i>
                ))}
            </p> */}
            <div className='font-bold text-md'>Skills Required:</div>
            <div className='flex gap-[5px] m-2'>
                {
                    job.skills.map((skill)=>{
                        return <div className='bg-slate-200 text-black py-1 px-3 rounded-full whitespace-nowrap'>{skill}</div>
                    })
                }
            </div>
            {user && 
            <>
                <div>Skills Matched:</div>
                <div>
                    {
                        user.skills.map((skill)=>{
                            if(job.skills.includes(skill)){
                                return <div>{skill}</div>
                            }
                        })
                    }
                </div>
            </>}
            <div className="d-flex  ">
                <button className="paymentButton rounded px-5">Apply</button>
                <div className="messaging-popup bg-dark text-white">
                    <Link to="/chat" className="popup-btn d-flex link mx-4">
                        <img className="msginhimg p-1" src={job.image} alt={job.title} />
                        <h5 className="mt-2 ">Messaging</h5>
                        <i className="bi bi-chevron-up text-white mt-2 mx-2"></i>
                    </Link>
                </div>
            </div>
            </div>
           </div>
        </div>
    );
};

export default JobDescription;
