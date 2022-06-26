import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import imgbun from '../../images/bun.png';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const Layer = (props) => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<button onClick={() => setOpen(true)} className={mainstyles.button}>
				<div className={mainstyles.block}>
					<DragIcon type='primary' />
					<ConstructorElement
						text={props.name}
						price={props.price}
						thumbnail={props.image}
					/>
				</div>
			</button>

			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<IngredientDetails image={props.image} name={props.name} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} />
			</Modal>
		</>
	)
}


const BurgerConstructor = ({ data }) => {
	const [open, setOpen] = React.useState(false);

	const sauce = data.filter(element => element.type === "sauce");
	const main = data.filter(element => element.type === "main");
	const mediumLayer = sauce.concat(main);

	return (
		<>
			<div className={`${mainstyles.order} ${'pl-10'}`}>

				{/* верхняя булка */}
				<button onClick={() => setOpen(true)} className={mainstyles.button}>
					<div className={`${mainstyles.block} ${'pl-2'}`}>
						<ConstructorElement
							type={"top"}
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={20}
							thumbnail={imgbun}
						/>
					</div>
				</button>
				{/* <Modal isOpen={open} onClose={() => setOpen(false)}>
			<IngredientDetails image={data.image_large} name={data.name} calories={data.calories} 
			 proteins={data.proteins} fat={data.fat} carbohydrates={data.carbohydrates}/>			
			</Modal> */}
				{/* *** */}

				<div className={mainstyles.wrapper_burger}>
					{mediumLayer.length &&
						mediumLayer.map((mediumLayer, index) =>
							<Layer key={index} name={mediumLayer.name} price={mediumLayer.price} image={mediumLayer.image} calories={mediumLayer.calories}
								proteins={mediumLayer.proteins} fat={mediumLayer.fat} carbohydrates={mediumLayer.carbohydrates} />)}
				</div>

				{/* нижняя булка */}
				<button onClick={() => setOpen(true)} className={`${mainstyles.button} ${'mb-10'}`}>
					<div className={`${mainstyles.block} ${'pl-2'}`}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={20}
							thumbnail={imgbun}
						/>
					</div>
				</button>
				{/* <Modal isOpen={open} onClose={() => setOpen(false)}>
			<IngredientDetails image={data.image_large} name={data.name} calories={data.calories} 
			 proteins={data.proteins} fat={data.fat} carbohydrates={data.carbohydrates}/>			
			</Modal> */}
				{/* *** */}

				<div className={`${mainstyles.button} ${'pt-10 pr-10'}`}>
					<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>610</p>
					<Button onClick={() => setOpen(true)} type='primary' size='medium'>
						Оформить заказ
					</Button>
				</div>

				{/* модальное окно кнопки оформления заказа*/}
				<Modal isOpen={open} onClose={() => setOpen(false)}>
					<OrderDetails number={'1234567890'} id={'Идентификатор заказа'} message={'Ваш заказ начали готовить'} recommendation={'Дождитесь готовности на орбитальной станции'} />
				</Modal>
			</div>
		</>
	)
}

BurgerConstructor.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	open: PropTypes.bool,
	price: PropTypes.number,
	isLocked: PropTypes.bool,
	calories: PropTypes.string,
	proteins: PropTypes.string,
	fat: PropTypes.string,
	carbohydrates: PropTypes.string,
	key: PropTypes.number,
	name: PropTypes.string,
	type: PropTypes.string,
	size: PropTypes.string,
}

export default BurgerConstructor;