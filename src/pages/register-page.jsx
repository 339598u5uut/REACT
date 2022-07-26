import React from 'react';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Logo, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { createUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function RegisterPage() {
	const dispatch = useDispatch()
	const inputRef = React.useRef(null)
	const createUserSuccess = useSelector(state => state.user.createUserSuccess);
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const [form, setValue] = useState({ "email": '', "password": '', 'name': '' });

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
	}

	const onChange = e => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	function registerUser(event) {
		event.preventDefault();
		dispatch(createUser(form));
		setValue('');
	};

	if (isAuthenticated === true || createUserSuccess === true) {
		return (
			<Redirect
				to={{
					pathname: '/'
				}}
			/>
		);
	};

	return (
		<form className={`${loginStyle.container} ${'pb-10'}`} onSubmit={registerUser}>
			<div className={loginStyle.wrapper}>
				<p className="text text_type_main-medium">Регистрация</p>

				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={onChange}
					value={form.name || ''}
					name={'name'}
					error={false}
					ref={inputRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>

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
					Зарегистрироваться
				</Button>
			</div>
			<p className="text text_type_main-default text_color_inactive">
				<span className='pr-2'>Уже зарегистрированы?</span>
				<span className={loginStyle.description}>
					<Link to='/login'>Войти</Link></span>
			</p>
		</form>
	)
}

export default RegisterPage;