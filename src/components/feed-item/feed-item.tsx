import styleFeed from './feed-item-style.module.css';
import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TFeedItem } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';

export const FeedItem: FC<TFeedItem> = ({ _id, number, data, name, list, totalPrice }) => {

	const location = useLocation();
	let feedId = _id;

	return (
		<li className={styleFeed.container}>
			<Link
				to={{
					pathname: `/feed/${feedId}`,
					state: { background: location },
				}}
			>
				<p className={`${styleFeed.paragraph} ${'mb-6'}`}>
					<span className='text text_type_digits-default'>#{number}</span>
					<span className="text text_type_main-small text_color_inactive">{data}</span>
				</p>
				<p className='text text_type_main-default mb-6'>{name}</p>
				<div className={styleFeed.order}>
					{list}
					<div className={`${styleFeed.price} ${'text text_type_digits-default'}`}>
						{totalPrice}&nbsp;<CurrencyIcon type={'primary'} />
					</div>
				</div>
			</Link>
		</li>

	)
}
