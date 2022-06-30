import React from 'react';
import './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import style from './app.module.css'

class App extends React.Component {
  state = {
    isLoading: false,
    hasError: false,
    data: [],
    URL: 'https://norma.nomoreparties.space/api/ingredients',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ ...this.state, hasError: false, isLoading: true });
    fetch(this.state.URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not OK');
        }
        return res.json();
      })
      .then(data => this.setState({ ...this.state, data: data.data, isLoading: false }))
      .catch(e => this.setState({ hasError: true, isLoading: false }))
  };

  render() {
    const { data, isLoading, hasError } = this.state;
    return (
      <div className="App">
        <AppHeader />
        <main>
          <section className={style.section}>
            <p className={'text text_type_main-large mb-5'}>Соберите бургер</p>
            <div className={style.container}>
              {isLoading && 'Загрузка...'}
              {hasError && 'Произошла ошибка'}
              {!isLoading &&
                !hasError &&
                !!data.length &&
                <BurgerIngredients data={data} />}
              {!isLoading &&
                !hasError &&
                data.length &&
                <BurgerConstructor data={data} />}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;

