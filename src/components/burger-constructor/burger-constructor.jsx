import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import imgbun from '../../images/bun.png';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';


const Layer = (props) => {
	return (
		<div className={mainstyles.block}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={props.name}
				price={props.price}
				thumbnail={props.image}
			/>
		</div>
	)
}

const BurgerConstructor = ({ data }) => {
	const [open, setOpen] = React.useState(false);

	const sauce = data.filter(element => element.type === "sauce");
	const main = data.filter(element => element.type === "main");
	const mediumLayer = sauce.concat(main);

	return (
		<div className={`${mainstyles.order} ${'pl-10'}`}>

			{/* верхняя булка */}
			<div className={`${mainstyles.block} ${'pl-8'}`}>
				<ConstructorElement
					type={"top"}
					isLocked={true}
					text='Краторная булка N-200i (верх)'
					price={20}
					thumbnail={imgbun}
				/>
			</div>

			<div className={mainstyles.wrapper_burger}>
				{mediumLayer.length &&
					mediumLayer.map((mediumLayer, index) =>
						<Layer key={index} name={mediumLayer.name} price={mediumLayer.price} image={mediumLayer.image} calories={mediumLayer.calories}
							proteins={mediumLayer.proteins} fat={mediumLayer.fat} carbohydrates={mediumLayer.carbohydrates} />)}
			</div>

			{/* нижняя булка */}
			<div className={`${mainstyles.block} ${'pl-8'}`}>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text='Краторная булка N-200i (верх)'
					price={20}
					thumbnail={imgbun}
				/>
			</div>

			<div className={`${mainstyles.button} ${'pt-10 pr-10'}`}>
				<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>610</p>
				<Button onClick={() => setOpen(true)} type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>

			{/* модальное окно кнопки оформления заказа*/}
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<OrderDetails number='123456' id='Идентификатор заказа' message='Ваш заказ начали готовить' recommendation='Дождитесь готовности на орбитальной станции' />
			</Modal>
		</div>
	)
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string,
		open: PropTypes.bool,
		isLocked: PropTypes.bool,
		key: PropTypes.number,
		type: PropTypes.string,
		size: PropTypes.string,
		price: PropTypes.number.isRequired,
		calories: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
}

export default BurgerConstructor;