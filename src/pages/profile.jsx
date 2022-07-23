import React from 'react';
import profileStyle from './profile-style.module.css';
import { Logo, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout } from '../services/actions/logout';
import { useDispatch,useSelector } from 'react-redux';
import { Redirect,NavLink,Link } from 'react-router-dom';
import { useEffect,useState,useRef  } from 'react';
import { getUser,editUser,deleteUser } from '../services/actions/get-user';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useCallback } from 'react';


function ProfilePage() {

	const dispatch = useDispatch();
	const inputRef = useRef(null)
	const history = useHistory(); 
	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
	}

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);



	const exit = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(logout());
			deleteUser();
					// После выхода переадресуем пользователя на маршрут /login
			history.replace({ pathname: '/login' });
		
		},
		[logout, history]
	  );


	const { name, email, password } = useSelector((state) => state.user.user);
	// const name = useSelector((state) => state.user.user.name);
	// const email = useSelector((state) => state.user.user.email);
	// const password = useSelector((state) => state.user.user.password);
	// console.log( name, email, password, 'vcbvgfgghghg' )

	const [form, setForm] = useState({name,email,password});
		 
		

	function formChange(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function onSubmit(e) {
		e.preventDefault();
		dispatch(editUser(form));
	}

	function cancelChanges(e) {
		e.preventDefault();
		setForm({ name, email, password })
	}

	const isChanged = useMemo(() => {
		return name !== form.name || email !== form.email || password !== form.password;
	  }, [form, name, email, password]);


	const requestLogoutSuccess = useSelector(state => state.logout.success);
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);

	if (requestLogoutSuccess||isAuthenticated===false) {
		return (
		  <Redirect
			to={{
			  pathname: '/login'
			}}
		  />
		);
	  };

	return (
		
				<div className={`${profileStyle.container} ${'pb-10'}`}>

					<div className={profileStyle.menu}>

						<ul className={profileStyle.wrapper_nav}>
							<li className="text text_type_main-medium text_color_inactive">
								<NavLink
								activeClassName={profileStyle.active}
								to={{ pathname: '/profile' }} 
								exact={true}
								>Профиль
								</NavLink>
								</li>
							<li className="text text_type_main-medium text_color_inactive">
								<NavLink
								activeClassName={profileStyle.active}
								to={{ pathname: '/profile/order' }} 
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

					</div>


					<form className={profileStyle.wrapper_inputs} onSubmit={onSubmit}>

						<Input
							type={'text'}
							placeholder={'Имя'}
							onChange={formChange}
							icon={'EditIcon'}
							value={form.name}
							name={'name'}
							error={false}
							ref={inputRef}
							onIconClick={onIconClick}
							errorText={'Ошибка'}
							size={'default'}
						/>

						<EmailInput
							onChange={formChange}
							value={form.email}
							name={'email'}
						/>

						<PasswordInput
							onChange={formChange}
							value={form.password}
							name={'password'}
						/>
						{isChanged&&
						<div className={profileStyle.buttonBlock}>

							<button className={`${profileStyle.description} ${'text text_type_main-small mr-5'}`}
								onClick={cancelChanges}>
									Отмена
									</button>
							<Button 
							type="primary" 
							size="medium"							
							>
								Сохранить
							</Button>

						</div>}
					</form>
				</div>
			)
}

export default ProfilePage;