import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = ({ onLoginSuccess }) => {
  const handleLoginSuccess = (response) => {
    // Decodifica el token de Google
    const userData = parseJwt(response.credential);

    // Guardar usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Ejecutar la función que pasa el componente padre (para mostrar las canciones guardadas)
    onLoginSuccess(userData);
  };

  const handleLoginFailure = (error) => {
    console.error("Error en el login de Google", error);
  };

  // Función para decodificar el JWT
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div>
      <GoogleLogin
        clientId="TU_CLIENT_ID.apps.googleusercontent.com"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        useOneTap
      />
    </div>
  );
};

export default Login;
