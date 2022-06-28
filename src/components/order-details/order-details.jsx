import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styledetails from './order-details-style.module.css';
import PropTypes from "prop-types";

function OrderDetails(props) {
	return (
		<div className={styledetails.container}>
			<p className={'text text_type_digits-large mb-8'}>{props.number}</p>
			<p className={'text text_type_main-default text_color_inactive mb-25'}>{props.id}</p>
			<CheckMarkIcon type="primary" />
			<p className={'text text_type_digits-small mb-5 pt-15'}>{props.message}</p>
			<p className={'text text_type_digits-small'}>{props.recommendation}</p>
		</div>
	)
}

OrderDetails.propTypes = {
	number: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	recommendation: PropTypes.string.isRequired,
}

export default OrderDetails;
