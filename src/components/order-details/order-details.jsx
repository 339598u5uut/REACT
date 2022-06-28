import React from 'react';
import styledetails from './order-details-style.module.css';
import PropTypes from "prop-types";
import done from '../../images/done.png'
function OrderDetails(props) {
	return (
		<div className={styledetails.container}>
			<p className={'text text_type_digits-large mb-8'}>{props.number}</p>
			<p className={'text text_type_main-default mb-15'}>{props.id}</p>
			<img src={done} alt="Done" />
			<p className={'text text_type_main-small mb-3 pt-15'}>{props.message}</p>
			<p className={'text text_type_main-small text_color_inactive'}>{props.recommendation}</p>
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
