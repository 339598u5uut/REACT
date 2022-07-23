import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import { useSelector } from 'react-redux';
import { getUser } from '../services/actions/get-user';

export function ProtectedRoute({ children, ...rest }) {

const user = useSelector(state => state.user.user);
console.log(user)
const [isUserLoaded, setUserLoaded] = useState(false);

const init = async () => {
  // Вызовем запрос getUser и изменим состояние isUserLoaded
await getUser();
setUserLoaded(true);
};

useEffect(() => {
  // При монтировании компонента запросим данные о пользователе
init();
}, []);


if (!isUserLoaded) {
  return null;
}



return (
  <Route
    {...rest}
          // Получим текущий маршрут, с которого произойдёт переадресация 
          // для неавторизованного пользователя
    render={({ location }) =>
      user ? (
        children
      ) : (
                  <Redirect
                      // Передадим в пропс to не строку, а объект.
                      to={{
                          // Маршрут, на который произойдёт переадресация
                          pathname: '/login',
                          // В from сохраним текущий маршрут
            state: { from: location }
                      }}
        />
              )
    }
  />
);
} 
