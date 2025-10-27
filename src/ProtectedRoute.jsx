import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';

// Componente para rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { user, token } = useUserContext();
  
  // Si no hay token o usuario, redirigir al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente para rutas que requieren suscripción premium
export const PremiumRoute = ({ children }) => {
  const { user, token } = useUserContext();
  
  // Primero verificar autenticación
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Verificar si tiene plan premium
  if (!user.isPremium) {
    return <Navigate to="/select-plan" replace />;
  }
  
  return children;
};

// Componente para rutas públicas (solo accesibles si NO estás autenticado)
export const PublicRoute = ({ children }) => {
  const { user, token } = useUserContext();
  
  // Si ya está autenticado, redirigir al track
  if (token && user) {
    return <Navigate to="/track" replace />;
  }
  
  return children;
};

export default ProtectedRoute;