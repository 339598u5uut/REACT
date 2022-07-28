import React from 'react';
import profileStyle from './profile-style.module.css';
import { Logo, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo } from 'react';
import {  editUser, deleteUser, logout } from '../services/actions/user';

function ProfilePage() {

	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const history = useHistory();
	const { name, email, password } = useSelector((state) => state.user.user);

	const [form, setForm] = useState({
		name: name,
		email: email,
		password: password
	});

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
	}

	useEffect(() => {
		setForm({ name, email, password })
	}, [name, email, password]);

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

	const exit = (e) => {
		console.log('вместо коллбэка')
		e.preventDefault();
		dispatch(logout());
		dispatch(deleteUser());
		history.replace({ pathname: '/login' });		
	}

	const isChanged = useMemo(() => {
		return name !== form.name || email !== form.email || password !== form.password;
	}, [form, name, email, password]);

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
					value={form.name || ''}
					name={'name'}
					error={false}
					ref={inputRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>

				<EmailInput
					onChange={formChange}
					value={form.email || ''}
					name={'email'}
				/>

				<PasswordInput
					onChange={formChange}
					value={form.password || ''}
					name={'password'}
				/>
				{isChanged &&
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