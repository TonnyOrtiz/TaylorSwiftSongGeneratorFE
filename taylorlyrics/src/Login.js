import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Extrae la información del usuario y la función de inicio de sesión desde el contexto de autenticación
  const [profile, setProfile] = useState(null); // Estado para almacenar la información del perfil


  // Maneja el inicio de sesión con Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse); // Verifica el token recibido
      login({ access_token: tokenResponse.access_token }); // Guarda el token en el AuthContext
      navigate('/app'); // Redirige a la aplicación principal
    },
    onError: (error) => console.log(error),
  });

  // Obtén la información del perfil una vez que el usuario se autentique
  useEffect(() => {
    if (profile) {
      console.log('User profile fetched:', profile); // Verifica los datos del perfil
    }
  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        );
        setProfile(res.data);
        login(res.data); // Guarda la información del perfil en el AuthContext
      } catch (err) {
        console.log(err);
      }
    };

    if (user?.access_token) {
      fetchProfile();
    }
  }, [user, login]);

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
          <h1>Hi, I'm Taylor Swift</h1>
          <span>or use your Google account for registration</span>
          <button type="button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google-plus-g"></i> Sign Up with Google
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Hi, I'm Taylor Swift</h1>
          <span></span>
          <button type="button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google-plus-g"></i> Sign In with Google
          </button>
          <h3>and let's make some music</h3>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hi, I'm Taylor Swift</h1>
            <div className="inspiration">
              <img
                src="https://images.seattletimes.com/wp-content/uploads/2023/07/07222023_swift_213100.jpg?d=768x557"
                alt="Taylor Swift"
                className="taylorswift'image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
