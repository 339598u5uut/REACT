import React from 'react';
import modaloverlaystyles from './modal-overlay-style.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
	const { onClose } = props;

	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
		}
	};

	React.useEffect(() => {
		document.addEventListener('keydown', keydownHandler);
		return () => {
			document.removeEventListener('keydown', keydownHandler)
		};
	}, []);

	return (
		<div className={modaloverlaystyles.overlay} onClick={onClose} onKeyDown = {keydownHandler}>
			{props.children}
		</div>
	)
}

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;