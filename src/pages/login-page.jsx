import React, { useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Logo, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../services/actions/user';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/actions/user';

function LoginPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [form, setValue] = useState({ "email": '', "password": '' });

	useEffect(() => {
		dispatch(getUser())
		console.log("sdfgghhjjklggg")
	}, []);

	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const userLogin = (e) => {
		e.preventDefault();
		dispatch(login(form));
	}

	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const loginSuccess = useSelector(state => state.user.loginSuccess);

	if (isAuthenticated === true || loginSuccess === true) {
		console.log("редирект")
		return (
			<Redirect
				to={{
					pathname: location?.state?.from?.pathname ?? '/'
				}}
			/>
		);
	};

	return (
		<form className={`${loginStyle.container} ${'pb-10'}`} onSubmit={userLogin}>
			<div className={loginStyle.wrapper}>
				<p className="text text_type_main-medium">Вход</p>

				<EmailInput
					onChange={onChange}
					value={form.email || ''}
					name={'email'}

				/>
				<PasswordInput
					onChange={onChange}
					value={form.password || ''}
					name={'password'}

				/>
				<Button type="primary" size="medium" className={'button'}>
					Войти
				</Button>
			</div>

			<p className="text text_type_main-default text_color_inactive mb-4">
				<span className='pr-2'>Вы — новый пользователь?</span>
				<span className={loginStyle.description}>
					<Link to='/register'>Зарегистрироваться</Link></span>

			</p>

			<p className="text text_type_main-default text_color_inactive mb-4">
				<span className='pr-2'>Забыли пароль?</span>
				<span className={loginStyle.description}>
					<Link to='/forgot-password'>Восстановить пароль</Link></span>
			</p>
		</form>
	)
}

export default LoginPage;