import headerstyles from './app-header-style.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {

  return (
    <header className={`${headerstyles.header} ${'mb-10'}`}>
      <div className={headerstyles.container}>

        <nav>
          <ul className={headerstyles.list}>
            <div className={headerstyles.list2}>

              <div className={headerstyles.icon}>
                <BurgerIcon type='secondary' />
                <li className={'text text_type_main-default'}>
                  <NavLink
                    activeClassName={headerstyles.active}
                    to={{ pathname: '/' }}
                    exact={true}
                  >Конструктор
                  </NavLink>

                </li>
              </div>

              <div className={headerstyles.icon}>
                <ListIcon type='secondary' />
                <li className={'text text_type_main-default'}>
                  <NavLink
                    activeClassName={headerstyles.active}
                    to={{ pathname: '/not-found' }}
                    exact={true}
                    className={'pl-2'}
                  >Лента заказов
                  </NavLink>
                </li>
              </div>

            </div>

            <div className={headerstyles.icon}>
              <ProfileIcon type='secondary' />
              <li className={'text text_type_main-default'}>
                <NavLink
                  activeClassName={headerstyles.active}
                  to={{ pathname: '/profile' }}
                  className={'pl-2'}>
                  Личный кабинет
                </NavLink>
              </li>
            </div>

            <Link to='/' className={headerstyles.logo}>
              <Logo />
            </Link>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default AppHeader;