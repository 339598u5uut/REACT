import './app.module.css';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Main from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import AppHeader from '../app-header/app-header';
import RegisterPage from '../../pages/register-page';
import ForgotPassword from '../../pages/forgot-password-page';
import ResetPassword from '../../pages/reset-password-page';
import { ProtectedRoute } from '../protected-route';
import { ProfileUserPage } from '../../pages/profile-user-page';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { deleteIngredient, closeIngredientModal } from '../../services/actions/ingredient-detales';
import { useDispatch } from '../../services/reducers/root-reducer';
import IngredientModalPage from '../../pages/page-modal-ingredient';
import NotFoundPage from '../../pages/not-found-page';
import { FC } from 'react';
import { TLocationState } from '../../utils/types';
import { Feed } from '../../pages/feed-page';
import { FeedDetales } from '../feed-detales/feed-detales';
import { ProfileOrdersPage } from '../../pages/profile-orders-page';
import { OrderModalPage } from '../../pages/order-modal-page';
import FeedModalPage from '../../pages/feed-modal-page';
import OrderProfileDetails from '../order-profile-details/order-profile-details';

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
          <ProfileUserPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfileOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <OrderModalPage />
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact={true}>
          <IngredientModalPage />
        </Route>
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedModalPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {background && (
        <>
          <Route
            path='/ingredients/:id'
            children={
              <Modal onClose={() => handleCloseModal()} name={''}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            children={
              <Modal onClose={() => handleCloseModal()} name={''}>
                <FeedDetales
                  number={0}
                  name={''}
                  status={''}
                  price={0}
                  createdAt={''}
                  totalPrice={0}
                  children={undefined} />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            children={
              <Modal onClose={() => handleCloseModal()} name={''}>
                <OrderProfileDetails
                  number={0}
                  name={''}
                  status={''}
                  price={0}
                  createdAt={''}
                  totalPrice={0}
                  children={undefined} />
              </Modal>
            }
          />
        </>
      )}
    </>
  )
};
export default App;

