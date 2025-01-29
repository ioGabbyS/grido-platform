// src/components/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Perfil</h1>
      {user ? (
        <>
          <p>Bienvenido, usuario autenticado.</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <p>Por favor, inicia sesión.</p>
      )}
    </div>
  );
};

export default Profile;