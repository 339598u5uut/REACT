import { Button as ButtonUI } from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, FC } from "react";

export const Button: FC<{
	type?: 'secondary' | 'primary';
	size?: 'small' | 'medium' | 'large';
	onClick?: (() => void) | ((e: SyntheticEvent) => void);
	disabled?: boolean;
	name?: string;
	htmlType?: 'button' | 'submit' | 'reset';
	className: string;
	children: React.ReactNode;
}> = ButtonUI;