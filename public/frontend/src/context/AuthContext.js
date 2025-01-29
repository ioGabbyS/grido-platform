// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si hay un token en localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías validar el token con el backend si es necesario
      setUser({ token });
    }
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Valores que se compartirán en el contexto
  const authValues = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};