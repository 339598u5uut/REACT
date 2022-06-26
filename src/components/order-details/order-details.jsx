import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styledetails from './order-details-style.module.css';
import PropTypes from 'react';

function OrderDetails(props) {
	return (
		<div className={styledetails.container}>
			<p className={'text text_type_digits-medium mb-8'}>{props.number}</p>
			<p className={'text text_type_main-default text_color_inactive mb-15'}>{props.id}</p>
			<CheckMarkIcon type="primary" className={'mb-15'} />
			<p className={'text text_type_digits-small mb-2'}>{props.message}</p>
			<p className={'text text_type_digits-small'}>{props.recommendation}</p>
		</div>
	)
}

OrderDetails.propTypes = {
	className: PropTypes.string,
	number:PropTypes.string,
	id:PropTypes.string,
	message:PropTypes.string,
	recommendation:PropTypes.string,
}

export default OrderDetails;
