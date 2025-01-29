//src/components/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar datos al backend
    const response = await fetch('http://localhost:3001/users?dni=12345678');
    const data = await response.json();
    if (data.length > 0 && data[0].password === password) {
      login('mock-token-123456'); // Simular un token
    } else {
      alert('DNI o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="DNI"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;


/*/}const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/users?dni=12345678');
    const data = await response.json();
    if (data.length > 0 && data[0].password === password) {
      login('mock-token-123456'); // Simular un token
    } else {
      alert('DNI o contraseña incorrectos');
    }
  };*/