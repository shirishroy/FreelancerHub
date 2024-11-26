
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scroll > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const { user } = useUser();
  const { isSignedIn, userId } = useAuth();

  useEffect(()=>{
    console.log(user);
    console.log(isSignedIn);
    console.log(userId);
  },[user]); 


  return (
    <div className={active || pathname !== "/s" ? "navbar active" : "navbar"}>
      <div className="container zindexNav">
        <div className="logo">
          <Link to="/" className="link">
            <span className="skill">Skill</span>
            <span className="bridge">Bridge</span>
          </Link>
        </div>
        <div className="links">
          <Link to="/findjob"  className="link">Find Jobs</Link>
          <Link to="/activejob"  className="link">Active Jobs</Link>
          <Link to="/project" className="link">Create Jobs</Link>
          <Link to="/contest" className="link">Contest</Link>
          <Link to="/" className="link">
            Home
          </Link>
          <div className="auth-buttons">
            <SignedOut>
              <SignInButton signUpForceRedirectUrl={'/'} />
              <SignUpButton signInForceRedirectUrl={'/profile'}/>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
