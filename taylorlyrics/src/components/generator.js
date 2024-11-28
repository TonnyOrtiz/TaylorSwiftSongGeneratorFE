import React from "react";

const Generator = () => {
  const handleLogout = () => {
    window.location.href = "/login.html"; // Redirige a login.html
  };

  return (
    <div>
      <h1>Generador de Letras de Taylor Swift</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <div>
        {/* Aquí agrega la funcionalidad del generador */}
        <p>Genera letras inspiradas en Taylor Swift 🎶</p>
      </div>
    </div>
  );
};

export default Generator;
