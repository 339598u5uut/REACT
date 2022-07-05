import React from 'react';
import './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import style from './app.module.css';
import { useEffect, useState } from 'react';
import { DataContext } from '../../services/app-context';
import { getIngredientsRequest } from '../utils/app-api';
import { useSelector,useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';



function App() {
   
  const dispatch = useDispatch();


  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);


  // useEffect(() => {
  //   setIsLoading(true);
  //   getIngredientsRequest()
  //     .then(setData)
  //     .catch(e => {
  //       setHasError(true);
  //       setIsLoading(false);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);



  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={style.section}>
          <p className={'text text_type_main-large mb-5'}>Соберите бургер</p>
          <div className={style.container}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            <DataContext.Provider value={{ data, setData }}>
              {!isLoading &&
                !hasError &&
                !!data.length &&
                <BurgerIngredients data={data} />}
              {!isLoading &&
                !hasError &&
                data.length &&
                <BurgerConstructor data={data} />}
            </DataContext.Provider>

          </div>
        </section>
      </main>
    </div>
  );
}


export default App;

