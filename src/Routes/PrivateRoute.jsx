import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null;
};

export default function PrivateRoute({ element, ...rest }) {
  // Check if the user is authenticated, if not redirect to Login page
  return isAuthenticated() ? element : <Navigate to="/login" />;
}
