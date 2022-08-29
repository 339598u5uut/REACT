import { useDispatch } from "../../services/reducers/root-reducer";
import { NavLink, useHistory } from 'react-router-dom';
import { FC } from 'react';
import profileMenuStyle from './profile-menu-style.module.css';
import { deleteUser, logout } from "../../services/actions/user";

export const ProfileMenu: FC = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const exit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(logout());
		dispatch(deleteUser());
		history.replace({ pathname: '/login' });
	}
	return (
		<nav className={profileMenuStyle.menu}>
			<ul className={profileMenuStyle.wrapper_nav}>
				<li className="text text_type_main-medium text_color_inactive">
					<NavLink
						activeClassName={profileMenuStyle.active}
						to={{ pathname: '/profile' }}
						exact={true}
					>Профиль
					</NavLink>
				</li>
				<li className="text text_type_main-medium text_color_inactive">
					<NavLink
						activeClassName={profileMenuStyle.active}
						to={{ pathname: '/profile/orders' }}
						exact={true}
					>История заказов
					</NavLink>
				</li>
				<li className="text text_type_main-medium text_color_inactive">
					<button type="submit" onClick={exit}>Выход</button></li>
			</ul>

			<p className="text text_type_main-small text_color_inactive">
				В этом разделе вы можете <br />изменить свои персональные данные
			</p>

		</nav>

	)
}