import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx'

function App() {
  return (
    <div className="App">
     <AppHeader/>
     <main>
				<section style={{ margin:"0 auto", maxWidth:"1240px" }}>
        <p className={'text text_type_digits-medium mb-5'}>Соберите бургер</p>
          <div style={{ margin:"0 auto", display:"flex", maxWidth:"1240px" }}>
     <BurgerIngredients/>
     <BurgerConstructor/>
     </div>
     </section>
			</main>
    </div>
  );
}

export default App;
