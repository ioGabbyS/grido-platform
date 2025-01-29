// Recompensas.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';

const Recompensas = () => {
  const [recompensas, setRecompensas] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Simular una solicitud al backend
    const mockRecompensas = [
      { id: 1, nombre: 'Helado Gratis', puntosRequeridos: 50 },
      { id: 2, nombre: '2x1 en Helados', puntosRequeridos: 30 },
    ];
    setRecompensas(mockRecompensas);
  }, []);

  return (
    <div>
      <h2>Recompensas Disponibles</h2>
      {recompensas.map((recompensa) => (
        <div key={recompensa.id}>
          <h3>{recompensa.nombre}</h3>
          <p>Puntos requeridos: {recompensa.puntosRequeridos}</p>
          {user && (
            <button
              disabled={user.puntos < recompensa.puntosRequeridos}
              onClick={() => alert(`Canjeaste ${recompensa.nombre}`)}
            >
              Canjear
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Recompensas;