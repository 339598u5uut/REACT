import React from 'react';
import modalstyles from './modal-style.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from "prop-types";
import close from '../../images/icon.png';
import { useSelector } from 'react-redux';
const modalRoot = document.getElementById("react-modals");
function Modal(props) {
	const { isOpen, onClose } = props;
	const isFetching = useSelector(state => state.order.isFetching);

	return !isOpen ? null :
		ReactDOM.createPortal(
			<div className={modalstyles.wrapper}>
				<div className={modalstyles.container}>
					{isFetching === true ? <h3>Loading...</h3> : ''}
					<p className={'text text_type_main-medium'}>{props.name}</p>
					<button className={modalstyles.icon} onClick={onClose}>
						<img src={close} alt="Close" className={'icon'} />

					</button>
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
	 onClose: PropTypes.bool.isRequired,
}

export default Modal;