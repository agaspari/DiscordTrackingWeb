import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';
import AuthProvider from "./providers/AuthorizationProvider";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
