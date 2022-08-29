import profileStyle from './profile-user-page-style.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch,useSelector } from '../services/reducers/root-reducer';
import { useEffect, useState, useRef, useMemo, FC } from 'react';
import { Button } from '../components/Button';
import { editUser  } from '../services/actions/user';
import { ProfileMenu } from '../components/profile-menu/profile-menu';

export const ProfileUserPage:FC=()=> {

	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);
	
	const { name, email, password } = useSelector((state) => state.user.user);

	const [form, setForm] = useState({
		name: name,
		email: email,
		password: password
	});

	const onIconClick = () => {
		setTimeout(() => inputRef.current?.focus(), 0);
	}

	useEffect(() => {
		setForm({ name, email, password })
	}, [name, email, password]);

	function formChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		dispatch(editUser(form));
	}

	function cancelChanges(e: React.SyntheticEvent) {
		e.preventDefault();
		setForm({ name, email, password })
	}


	const isChanged = useMemo(() => {
		return name !== form.name || email !== form.email || password !== form.password;
	}, [form, name, email, password]);

	return(
		<main className={`${profileStyle.container} ${'pb-10'}`}>
			<ProfileMenu/>					
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
							className={''}>
							Сохранить
						</Button>

					</div>}
			</form>
			</main>
	)
}