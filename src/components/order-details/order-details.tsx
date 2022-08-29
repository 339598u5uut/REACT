import styledetails from './order-details-style.module.css';
import done from '../../images/done.png';
import { FC } from 'react';
import { TOrderDetails } from '../../utils/types';

export const OrderDetails: FC<TOrderDetails> = ({ number, id, message, recommendation }) => {

	return (
		<div className={styledetails.container}>
			<p className={'text text_type_digits-large mb-8'}>{number}</p>
			<p className={'text text_type_main-default mb-15'}>{id}</p>
			<img src={done} alt="Done" />
			<p className={'text text_type_main-small mb-3 pt-15'}>{message}</p>
			<p className={'text text_type_main-small text_color_inactive'}>{recommendation}</p>
		</div>
	)
}

export default OrderDetails;