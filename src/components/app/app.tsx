import React from 'react';
import './app.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../../pages/main';
import LoginPage from '../../pages/login-page';
import AppHeader from '../app-header/app-header';
import RegisterPage from '../../pages/register-page';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route';
import ProfilePage from '../../pages/profile';


function App() {

  return (  
   <> 
      <AppHeader />   
      <Switch>
        <Route path="/" exact={true}>
          <Main />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
      </>   
  )
};
export default App;
