import React from 'react';
import modaloverlaystyles from './modal-overlay-style.module.css';
import { FC } from 'react';
import { TModalOverlay } from '../../utils/types';

const ModalOverlay: FC<TModalOverlay> = ({ onClose, children }) => {
	return (
		<div className={modaloverlaystyles.overlay} onClick={onClose}>
			{children}
		</div>
	)
}

export default ModalOverlay;