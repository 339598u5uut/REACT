import React from 'react';
import './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import style from './app.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ingredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();
  const [data] = useState([]);

  useEffect(() => {
    // @ts-ignore
    dispatch(ingredients())
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <section className={style.section}>
          <p className={'text text_type_main-large mb-5'}>Соберите бургер</p>
          <div className={style.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} />
            </DndProvider>
          </div>
        </section>
      </main>

    </div>
  );
};
export default App;
