import React,{ useState }  from 'react';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Link, Redirect } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../components/Button';
import { createUser } from '../services/actions/user';
import { useDispatch, useSelector } from '../services/reducers/root-reducer';

function RegisterPage() {
	const dispatch = useDispatch()
	const inputRef = React.useRef<HTMLInputElement>(null)
	const createUserSuccess = useSelector((state) => state.user.createUserSuccess);

	const [form, setValue] = useState({ "email": '', "password": '', 'name': '' });

	const onIconClick = () => {
		setTimeout(() => inputRef.current?.focus(), 0);
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	function registerUser(e: React.SyntheticEvent) {
		e.preventDefault();
		dispatch(createUser(form));
		setValue({ "email": '', "password": '', 'name': '' });
	};

	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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