import React, { useEffect, useState, FC } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../components/Button';
import { login, getUser } from '../services/actions/user';
import { useDispatch, useSelector } from '../services/reducers/root-reducer';
import { TForm, TLocationState } from '../utils/types';

const LoginPage: FC = () => {

	const dispatch = useDispatch();
	const location = useLocation() as unknown as TLocationState;
	const [form, setValue] = useState<TForm>({ "email": '', "password": '' });

	useEffect(() => {
		dispatch(getUser())
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const userLogin = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(login(form));
	}

	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const loginSuccess = useSelector((state) => state.user.loginSuccess);

	if (isAuthenticated === true || loginSuccess === true) {
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