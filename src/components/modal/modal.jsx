import React from 'react';
import modalstyles from './modal-style.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useRef } from 'react';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals")

function Modal(props) {
	const [open, setOpen] = React.useState(false);
	const { isOpen, onClose } = props;
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

	return !isOpen ? null :
		ReactDOM.createPortal(
			<div className={modalstyles.wrapper}>
				<div className={modalstyles.container}>
					<p className={'text text_type_main-medium'}>{props.name}</p>
					<button className={modalstyles.icon} onClick={onClose}><CloseIcon /></button>
					{props.children}
				</div>
				<ModalOverlay onClose={onClose} />
			</div>,
			modalRoot
		)
}

Modal.propTypes = {
	name: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
}

export default Modal;