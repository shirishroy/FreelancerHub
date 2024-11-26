import React from "react";
import "./Home.scss"
import bgbg from "../../images/bgbg.avif"
import bgover from "../../images/xyz.webp"
// import Sliders from "./Sliders";
// import Footer from "./Footer"
// import FreelancerDashboard from "./FreelancerDashboard"
const Home = () =>{
    return(
        <div className="container-fluid bg-black text-white">
            <div className="row pt-5 pb-3">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="quote kalam-light text-center mt-3 mb-3">"Welcome to a World of Endless Possibilities: Where Freelancers Spark Creativity and Businesses Find Their Perfect Match!"</h1>
                       <div className="searchbox pt-4 mt-2 mb-4">
                         <form className="form" >
                         <i class="sicon fa-solid fa-magnifying-glass"></i>
                            <input className="homeinput" type="text" placeholder="Search here" />
                            <button className="homebtn" type="submit">Search</button>
                         </form>
                       </div>
                </div>
                <div
          className="col-md-6 pt-5 mt-4 mb-4 pb-4 d-flex justify-content-center"
          style={{
            backgroundImage: `url(${bgbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height:"32rem",
            
          }}
        >
        <img src={bgover} alt="" />
        </div>
            </div>
            <div className="row justify-content-center pt-4   pb-3">
              <div className="col-md-12">
                {/* <Sliders/>*/}
               
                {/*<FreelancerDashboard/> */}

              </div>
            </div>
        </div>
    )
}
export default Home;