import React from 'react';
import { Link } from 'react-router-dom';
import loginStyle from './login-forgot-register-reset-style.module.css';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { recoveryPassword } from '../services/actions/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function ResetPassword() {

	const dispatch = useDispatch()

	const [valueInput1, setValueInput1] = React.useState('');
	const inputRef1 = React.useRef(null)

	const [valueInput2, setValueInput2] = React.useState('');
	const inputRef2 = React.useRef(null)

	const onIconClick1 = () => {
		setTimeout(() => inputRef1.current.focus(), 0);
	}

	const onIconClick2 = () => {
		setTimeout(() => inputRef2.current.focus(), 0);
	}


	function recoveryPass(event) {
		event.preventDefault();
		const data = {
			"password": inputRef1.current.value,
			"token": inputRef2.current.value,
		}
		dispatch(recoveryPassword(data));
		setValueInput1('');
		setValueInput2('');
	};

	const request = useSelector(state => state.recoveryPassword.success);
	const user = useSelector(state => state.authorization.user);

// if (user) {
//     return (
//             // Переадресовываем авторизованного пользователя на главную страницу
//       <Redirect
//         to={{
//           pathname: '/'
//         }}
//       />
//     );
//   };


	return (
		request === true ?
		(<Redirect to={{pathname: '/login'}}/>):(
		<form className={`${loginStyle.container} ${'pb-10'}`} onSubmit={recoveryPass}>
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
	)

}

export default ResetPassword;