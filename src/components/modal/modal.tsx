import React, { FC, useEffect } from 'react';
import modalstyles from './modal-style.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import close from '../../images/icon.png';
import { useSelector } from '../../services/reducers/root-reducer';
import { TModal } from '../../utils/types';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: FC<TModal> = ({ onClose, name, children }) => {

	const isFetching = useSelector((state) => state.order.isFetching);

	const handleKeyPress = (event: KeyboardEvent) => {
		const { key } = event;
		if (key === "Escape") {
			onClose();
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress)
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	},[])

	return (
		ReactDOM.createPortal(
			<div className={modalstyles.wrapper}>
				<div className={modalstyles.container}>
					{isFetching === true ? <h3 className={modalstyles.header_load}>Loading...</h3> : ''}
					<p className={'text text_type_main-medium'}>{name}</p>
					<button className={modalstyles.icon} onClick={onClose}>
						<img src={close} alt="Close" className={'icon'} />
					</button>
					{children}
				</div>
				<ModalOverlay onClose={onClose} />
			</div>,
			modalRoot
		))
}

export default Modal;