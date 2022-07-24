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
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deleteIngredient } from '../../services/actions/ingredient-detales';
import { useDispatch } from 'react-redux';
import { openIngredientModal, closeIngredientModal } from '../../services/actions/ingredient-detales';
import IngredientModalPage from '../../pages/page-modal-ingredient';

function App() {
 
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  //@ts-ignore
  const background = location.state && location.state.background;

  const handleCloseModal = () => {
		dispatch(deleteIngredient());
		dispatch(closeIngredientModal());
		history.goBack();
	};



  return (  
   <> 
      <AppHeader />   
      <Switch  location={background || location}>
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
        <Route path='/ingredients/:ingredientId' exact>
          <IngredientDetails />
        </Route>
        <Route path='/ingredients/:id' exact={true}>
                    <IngredientModalPage />
                </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            //@ts-ignore
            <Modal isOpen={openIngredientModal()} onClose={() => handleCloseModal()}>
            <IngredientDetails />
          </Modal>
          }
        />
      )}
      </>   
  )
};
export default App;

