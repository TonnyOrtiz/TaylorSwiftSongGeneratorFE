import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      login(); // Set authentication state
      navigate('/app'); // Redirect to App.js after successful login
    },
    onError: error => console.log(error),
  });

  const handleRegisterClick = () => {
    document.getElementById('container').classList.add('active');
  };

  const handleLoginClick = () => {
    document.getElementById('container').classList.remove('active');
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Hi, Im Taylor Swift</h1>
          <span>or use your Google account for registration</span>
          <button type="button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google-plus-g"></i> Sign Up with Google
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Hi, Im Taylor Swift</h1>
          <span></span>
          <button type="button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google-plus-g"></i> Sign In with Google 
          </button>
          <h3>and lets make some music</h3>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hi, I'm Taylor Swift</h1>
           
            <div className="inspiration">
              <img src="https://images.seattletimes.com/wp-content/uploads/2023/07/07222023_swift_213100.jpg?d=768x557" alt="Taylor Swift" className="taylorswift'image" />
            
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;