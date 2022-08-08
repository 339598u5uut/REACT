import React, { SyntheticEvent, FC } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Input, Button as ButtonUI } from '@ya.praktikum/react-developer-burger-ui-components';
import { recoveryPassword } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';

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


const ResetPassword: FC = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const forgotPassword = useSelector((state: any) => state.user.forgotPasswordSuccess);
	const request = useSelector((state: any) => state.user.resetPasswordSuccess);
	const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

	const [valueInput1, setValueInput1] = React.useState('');
	const inputRef1 = React.useRef<HTMLInputElement>(null);

	const [valueInput2, setValueInput2] = React.useState('');
	const inputRef2 = React.useRef<HTMLInputElement>(null);

	const onIconClick1 = () => {
		setTimeout(() => inputRef1.current!.focus(), 0);
	}

	const onIconClick2 = () => {
		setTimeout(() => inputRef2.current!.focus(), 0);
	}

	function resetPass(e: React.SyntheticEvent) {
		e.preventDefault();
		const data = {
			"password": inputRef1.current!.value,
			"token": inputRef2.current!.value,
		}
		dispatch<any>(recoveryPassword(data));
		setValueInput1('');
		setValueInput2('');
	};

	if (request === true) {
		return (
			<Redirect
				to={{
					pathname: '/login'
				}}
			/>
		);
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

	if (forgotPassword === false) {
		history.replace({
			pathname: '/forgot-password',
		})
	}

	return (
		<form className={`${loginStyle.container} ${'pb-10'}`} onSubmit={resetPass}>
			<div className={loginStyle.wrapper}>
				<p className="text text_type_main-medium">Восстановление пароля</p>

				<Input
					type={'text'}
					placeholder={'Введите новый пароль'}
					onChange={e => setValueInput1(e.target.value)}
					icon={'ShowIcon'}
					value={valueInput1}
					name={'name'}
					error={false}
					ref={inputRef1}
					onIconClick={onIconClick1}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={e => setValueInput2(e.target.value)}
					value={valueInput2}
					name={'name'}
					error={false}
					ref={inputRef2}
					onIconClick={onIconClick2}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Button type="primary" size="medium" className={'button'}>
					Сохранить
				</Button>
			</div>
			<p className="text text_type_main-default text_color_inactive mb-4">
				<span className='pr-2'>Вспомнили пароль?</span>
				<span className={loginStyle.description}>
					<Link to='/login'>Войти</Link></span>
			</p>
		</form>
	)
}

export default ResetPassword;
