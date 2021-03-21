import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import ProfilePage from './pages/profile';
import { AuthProvider } from './common/auth-provider';
import LoginPage from './pages/login';
import PrivateRoute from './common/private-route';
import GuestRoute from './common/guest-route';

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/settings" component={ProfilePage} />
        <GuestRoute path="/login" component={LoginPage} />
      </Router>
    </AuthProvider>
  );
}

export default App;
