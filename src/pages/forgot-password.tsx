import React, { SyntheticEvent, useState,FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Input, Button as ButtonUI } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../services/actions/user';
import { RootState } from '../services/reducers/root-reducer';

const Button: React.FC<{
	type?: 'secondary' | 'primary';
	size?: 'small' | 'medium' | 'large';
	onClick?: (() => void) | ((e: SyntheticEvent) => void);
	disabled?: boolean;
	name?: string;
	htmlType?: 'button' | 'submit' | 'reset';
	className: string;
	children: React.ReactNode;
}> = ButtonUI;

const ForgotPassword:FC=()=> {

	const [value, setValue] = useState('');
	const inputRef = React.useRef<HTMLInputElement>(null)
	const dispatch = useDispatch();
	const request = useSelector((state: any) => state.user.forgotPasswordSuccess);
	const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

	function sendEmail(event: { preventDefault: () => void; }) {
		event.preventDefault();
		let email = {
			"email": inputRef!.current!.value
		};

		dispatch<any>(forgotPassword(email));
		setValue('');
	};

	if (isAuthenticated === true) {
		return (
			<Redirect
				to={{
					pathname: '/'
				}}
			/>
		);
	};

	if (request === true) {
		return (
			<Redirect
				to={'/reset-password'}
			/>
		)
	}

	return (

		<form className={`${loginStyle.container} ${'pb-10'}`} onSubmit={sendEmail}>
			<div className={loginStyle.wrapper}>
				<p className="text text_type_main-medium">Восстановление пароля</p>

				<Input
					type={'text'}
					placeholder={'Укажите e-mail'}
					value={value}
					ref={inputRef}
					onChange={(event) => setValue(event.target.value)}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
				/>

				<Button type="primary" size="medium" className={'button'}>
					Восстановить
				</Button>
			</div>
			<p className="text text_type_main-default text_color_inactive mb-4">
				<span className='pr-2'>Вспомнили пароль?</span>
				<span className={loginStyle.description}>
					<Link to='/login'>Войти</Link></span>
			</p>
		</form >
	)
}

export default ForgotPassword;