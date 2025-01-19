import React from "react";
import './SignIn.css'; // Importing the updated CSS file

const SignIn = () => {
  const handleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-box">
        <h1 className="sign-in-title">FocusHive</h1>
        <p className="sign-in-subtitle">
          Your one-stop platform to manage notes, analytics, and summaries. Get started with Google Sign-In!
        </p>

        <button
          onClick={handleSignIn}
          className="sign-in-button"
        >
          Sign In with Google
        </button>

        <div className="sign-in-footer">
          <p>New to FocusHive? <span className="sign-in-footer-link">Learn More</span></p>
          <p>By signing in, you agree to our <span className="sign-in-footer-link">Terms of Service</span> and <span className="sign-in-footer-link">Privacy Policy</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
