import React from 'react';
import modaloverlaystyles from './modal-overlay-style.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
	const { onClose } = props;
	return (
		<div className={modaloverlaystyles.overlay} onClick={onClose}>
			{props.children}
		</div>
	)
}

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
}

export default ModalOverlay;