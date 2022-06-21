import React from 'react';
import headerstyles from './app-header-style.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  state = {
    url: ''
  };

  render() {
    return (
      <header className={`${headerstyles.header} ${'mb-10'}`}>
        <div className={headerstyles.container}>
          <nav>
            <ul className={headerstyles.list}>
              <div className={headerstyles.list2}>
                <div className={headerstyles.icon}>
                  <BurgerIcon type='primary' />
                  <li className={'text text_type_main-default'}><a href={this.state.url}>Конструктор</a></li>
                </div>
                <div className={headerstyles.icon}>
                  <ListIcon type='secondary' />
                  <li className={'text text_type_main-default'}><a href={this.state.url} className={'pl-2'}>Лента заказов</a></li>
                </div>
              </div>
              <div className={headerstyles.icon}>
                <ProfileIcon type='secondary' />
                <li className={'text text_type_main-default'}><a href={this.state.url} className={'pl-2'}>Личный кабинет</a></li>
              </div>
              <a className={headerstyles.logo} href={this.state.url}><Logo /></a>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default AppHeader;