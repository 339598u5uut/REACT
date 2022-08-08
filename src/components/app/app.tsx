import './app.module.css';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
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
import { deleteIngredient, closeIngredientModal } from '../../services/actions/ingredient-detales';
import { useDispatch } from 'react-redux';
import IngredientModalPage from '../../pages/page-modal-ingredient';
import NotFoundPage from '../../pages/not-found';
import { FC } from 'react';
import { TLocationState } from '../../utils/types';

const App: FC = () => {

  const location = useLocation<TLocationState>();
  const history = useHistory();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleCloseModal = () => {
    dispatch(deleteIngredient());
    dispatch(closeIngredientModal());
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route path='/ingredients/:id' exact={true}>
          <IngredientModalPage />
        </Route>
        <Route path="/not-found" exact={true}>
          <NotFoundPage />
        </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal onClose={() => handleCloseModal()} name={''}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  )
};
export default App;

