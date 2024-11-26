import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
const Footer=()=>{
    return(
<div className="container-fluid bg-black">
    
<div className="row justify-content-around pt-5 text-white bg-black">
            
            <div className="col-md-3">
                <h2>Categories</h2>
                <div className="items d-flex flex-column">
                    <Link className="link flink">Graphics & Design</Link>
                    <Link className="link flink">Digital Marketing</Link>
                    <Link className="link flink">Writing & Translation</Link>
                    <Link className="link flink">Video & Animation</Link>
                    <Link className="link flink">Programming & Tech</Link>
                    <Link className="link flink">Data</Link>
                    <Link className="link flink">Business</Link>
                    
                </div>
            </div>
            <div className="col-md-3">
                <h2>About</h2>
                <div className="items d-flex flex-column">
                    <Link className="link flink">Careers</Link>
                    <Link className="link flink">Partnerships</Link>
                    <Link className="link flink">Terms of service</Link>
                    <Link className="link flink">Privacy Policy</Link>
                </div>
            </div>
            <div className="col-md-3">
                <h2>Support and Education</h2>
                <div className="items d-flex flex-column">
                    <Link className="link flink">Help & Support</Link>
                    <Link className="link flink">Trust & Safety</Link>
                    <Link className="link flink">Learn</Link>
                    <Link className="link flink">Buying</Link>
                    <Link className="link flink">Selling</Link>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12 text-center ft">
                
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved. Created by XYZ.
                </p>
            </div>
        </div>
</div>
    
    )
}

    
export default Footer