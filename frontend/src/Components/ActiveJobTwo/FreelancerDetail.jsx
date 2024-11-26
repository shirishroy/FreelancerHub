
import React, { useState, useEffect } from "react";
import "./Linkedin.scss";
import img from "../../images/bookcovers.webp";
import img2 from "../../images/dataentry.webp"
import { Link } from "react-router-dom";

const FreelancerDetail = ({ applicant, onClose }) => {
  console.log(applicant);
    return (
        <div className="container py-5 pointer">
            <div className="row">
            <div className="col-md-5">
            <img src={applicant.img} alt={applicant.name} className="img-fluid rounded" />
            </div>
                
        <div className="col-md-6">
        <div className="freelancer-detail bg-dark text-white p-3 rounded-4">
            <button onClick={onClose} className="btn btn-primary mb-3">Back</button>
            <h3>{applicant.name}</h3>
            
            <p>Rating: {Array(Math.max(0, Math.floor(applicant.rating))).fill().map((_, index) => (
                <i key={index} className="bi bi-star-fill stars mx-1"></i>
            ))}</p>
           <p>{applicant.description}</p>
        </div>
        </div>

            </div>
        </div>
    );
};

export default FreelancerDetail;


