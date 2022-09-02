import { Tab as TabUI } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

export const Tab: FC<{
	active: boolean;
	value: string;
	onClick: (value: string) => void;
	children?: React.ReactNode;
}> = TabUI;