import styleOrdersItem from './profile-orders-item-style.module.css';
import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TFeedItem } from '../../utils/types';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export const ProfileOrdersItem: FC<TFeedItem> = ({ _id, number, data, name, totalPrice, list, status }) => {

	const { url } = useRouteMatch();
	const location = useLocation();
	const done = status === 'done';

	return (
		<li className={styleOrdersItem.container}>
			<Link
				to={{
					pathname: `${url}/${_id}`,
					state: { background: location },
				}}
			>
				<p className={styleOrdersItem.paragraph}>
					<span className='mb-6 text text_type_digits-default'>#{number}</span>
					<span className="text text_type_main-default text_color_inactive">{data}</span>
				</p>
				<p className='mb-2 text text_type_main-medium'>{name}</p>
				<p className={`text text_type_main-default mb-6 ${done && styleOrdersItem.status}`}>{done ? 'Выполнен' : 'Готовится'}</p>
				<div className={styleOrdersItem.order}>
					{list}
					<div className={`${styleOrdersItem.price} text text_type_digits-default`}>{totalPrice}&nbsp;
						<CurrencyIcon type={'primary'} /></div>
				</div>
			</Link>
		</li>


	)
}