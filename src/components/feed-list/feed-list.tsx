import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import style from './feed-list-style.module.css';
import { TFeedList, TFeedListIngredients } from '../../utils/types';

export const FeedListDone: FC<TFeedList> = ({ number }) => {
	return (
		<li className={`text text_type_digits-default ${style.readyItem}`}>{number}</li>
	)
}

export const FeedListInWork: FC<TFeedList> = ({ number }) => {
	return (
		<li className={'text text_type_digits-default'}>{number}</li>
	)
}

export const FeedListIngredients: FC<TFeedListIngredients> = ({ name, price, image, counter }) => {
	return (
		<li className={style.list_item}>
			<div className={style.ingredient}>
				<img src={image} alt={name} />
				<p className={'text text_type_main-default'}>{name}</p>
			</div>
			<div className={style.price}>
				<p className='text text_type_digits-default'>{counter} x {price}</p>
				<CurrencyIcon type={"primary"} />
			</div>
		</li>)
}
