import React from 'react';
import modalstyles from './modal-style.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useRef } from 'react';
import { PropTypes } from 'react';

const modalRoot = document.getElementById("react-modals")

function Modal(props) {

	const [open, setOpen] = React.useState(false);
	const { isOpen, onClose } = props;
	const button = useRef(null);
	const modal = useRef(null);

	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				onClose();
				break;
			default:
		}
	};
	//тут отслеживается клик по оверлею,за пределами модального окна, но закрыть через ref button нажатием на кнопку модальное окно не могу
	// const onClick = e => {
	// 	if (modal.curent !== null && !modal.current.contains(e.target)) {
	// 		console.log('клик по оверлею')
	// 		console.log(modal.curent !== null)
	// 		button.current.onClick = { onClose }
	// 	}
	// }

	React.useEffect(() => {
		// document.addEventListener('click', onClick);
		document.addEventListener('keydown', keydownHandler);
		return () => {
			document.removeEventListener('keydown', keydownHandler)
			// document.removeEventListener('click', onClick);

		};
	}, []);

	return !isOpen ? null :
		ReactDOM.createPortal(
			<div className={modalstyles.wrapper}>
				<ModalOverlay>
					<div className={modalstyles.container} ref={modal}>
						<p className={'text text_type_main-medium'}>{props.name}</p>
						<button className={modalstyles.icon} onClick={onClose} ref={button}><CloseIcon /></button>
						{props.children}
					</div>
				</ModalOverlay>
			</div>,
			modalRoot
		)
}

// Modal.propTypes = {
//    key:PropTypes.number,
// 	open:PropTypes.bool,
// 	name:PropTypes.string,
// 	className: PropTypes.string,
// }

export default Modal;