import React from 'react';
import modaloverlaystyles from './modal-overlay-style.module.css';
import PropTypes from 'react';

function ModalOverlay(props) {
	return (
		<div className={modaloverlaystyles.overlay}>
			{props.children}
		</div>
	)
}

ModalOverlay.propTypes = {
	className: PropTypes.string,
}

export default ModalOverlay;