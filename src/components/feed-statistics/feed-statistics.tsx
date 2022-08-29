import styleFeedStatistics from './feed-statistics-style.module.css';
import { FC } from 'react';
import { TFeedStatistics } from '../../utils/types';

export const FeedStatistics: FC<TFeedStatistics> = ({ total, totalToday, ready, inwork }) => {
	return (
		<div className={styleFeedStatistics.container}>

			<div className={styleFeedStatistics.readyInwork}>
				<ul className={styleFeedStatistics.ready}>
					<p className={'pb-6 text text_type_main-medium'}>Готовы: </p>
					{ready}
				</ul>
				<ul className={styleFeedStatistics.inwork}>
					<p className={'pb-6 text text_type_main-medium'}>В работе: </p>
					{inwork}
				</ul>
			</div>

			<div>
				<p className={'text text_type_main-medium'}>Выполнено за все время:</p>
				<p className={'text text_type_digits-large'}>{total}</p>
			</div>
			<div>
				<p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
				<p className={'text text_type_digits-large'}>{totalToday}</p>

			</div>
		</div>

	)
}