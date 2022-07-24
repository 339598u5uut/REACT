import React from 'react';
import { Link } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/user';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

function ForgotPassword() {

	const [value, setValue] = useState('');


	const inputRef = React.useRef(null)
	const dispatch = useDispatch();

	
	function sendEmail(event) {
		event.preventDefault();
		let email = {
			"email": inputRef.current.value
		};
		dispatch(forgotPassword(email));
		setValue('');
	};

	
	const requestResetPassword = useSelector(state => state.resetPassword.success);
	// const user = useSelector(state => state.authorization.user);

	// if (user) {
	// 	return (
	// 			// Переадресовываем авторизованного пользователя на главную страницу
	// 	  <Redirect
	// 		to={{
	// 		  pathname: '/'
	// 		}}
	// 	  />
	// 	);
	//   };

if(requestResetPassword) {
	return (
		<Redirect
		  to={'/login'}
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
					onChange={(event) => 
						setValue(event.target.value)}																				
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