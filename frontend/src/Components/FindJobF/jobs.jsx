import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dataActions } from '../../store/data-slice';
import "./Jobs.scss";
import { useDispatch, useSelector } from 'react-redux';

const Developer = () => {
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="container-fluid bg-dark">
            <div className="row py-5">
                {
                    jobs && jobs.map(job => (
                        <div key={job.id} className="col-md-3 mb-3">
                            <Link to={`/job/${job._id}`} className="card bg-black text-white card-rest">
                                <img src={job.image} className="card-img-top card-image-job img-fluid" alt="Job Thumbnail" />
                                <div className="card-body bg-black text-white">
                                    <h3 className="card-title domain">{job.name}</h3>
                                    <p className="card-text desc">{job.description}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item name bg-black text-white">{job.domain}</li>
                                    {/* <li className="list-group-item rating bg-black text-white">
                                        Rating: {job.rating}
                                        {[...Array(Math.floor(job.rating))].map((_, index) => (
                                            <i key={index} className="bi bi-star-fill stars mx-1 start"></i>
                                        ))}
                                    </li> */}
                                    <li className="list-group-item price bg-black text-white">Price: {job.price}</li>
                                </ul>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Developer;
