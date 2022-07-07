import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ingredientType from '../../utils/types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { addIngredient } from '../../services/actions/ingredient';
import { useDrop } from "react-dnd";
let totalPrice;




// const Layer = (props,{onDropHandler}) => {
{/* <div className={`${mainstyles.block} ${'pl-8'}`} ref={dropTarget}>
			<ConstructorElement
				type={"top"}
				isLocked={true}
				text={props.name}
				price={props.price}
				thumbnail={props.image}
			/>
		</div> */}

// 	return (

// 	)
// }

// export const LayerTop = (props) => {

// 	return (
// 		<div className={`${mainstyles.block} ${'pl-8'}`}>
// 			<ConstructorElement
// 				type={"top"}
// 				isLocked={true}
// 				text={props.name}
// 				price={props.price}
// 				thumbnail={props.image}
// 			/>
// 		</div>
// 	)
// }

export const LayerBottom = (props) => {
	return (
		<div className={`${mainstyles.block} ${'pl-8'}`}>
			<ConstructorElement
				type="bottom"
				isLocked={true}
				text={props.name}
				price={props.price}
				thumbnail={props.image}
			/>
		</div>
	)
}


const BurgerConstructor = () => {
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();


	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item) {
			dispatch(addIngredient(item));
			console.log(item, 'item')
		},
	});


	const layersBurgersMedium = useSelector(state => state.ingredient.ingredientItems);
	const layersBun = useSelector(state => state.ingredient.ingredientBun);
	const order = useSelector(state => state.order.order)



	totalPrice = layersBurgersMedium.lenght ?
		(layersBurgersMedium.reduce((a, b) => a + b.price, 0) + (2 * layersBun.price))
		: 0

	


	// @ts-ignore
	function getCheckout(event) {
		event.preventDefault();
		dispatch(getOrder());
	};

	// const arrayIdIngredients = {
	// 	"ingredients": []
	// }

	return (
		<form className={`${mainstyles.order} ${'pl-10'}`} onSubmit={getCheckout}>


			{/* {layersBun ? <LayerTop {...layersBun} /> : ''} */}
			{layersBun ? (
				<div className={`${mainstyles.block} ${'pl-8'}`} ref={dropTarget}>
					<ConstructorElement
						type={"top"}
						isLocked={true}
						text={layersBun.name}
						price={layersBun.price}
						thumbnail={layersBun.image}
					/>
				</div>) : ''}


			<div className={mainstyles.wrapper_burger}>

				{layersBurgersMedium.lenght ?
					(layersBurgersMedium.map((_id) =>
						<div className={mainstyles.block} ref={dropTarget} key={layersBurgersMedium._id}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={layersBurgersMedium.name}
								price={layersBurgersMedium.price}
								thumbnail={layersBurgersMedium.image}
							/>
						</div>))
					: null}
			</div>

			{layersBun ? <LayerBottom {...layersBun} /> : ''}

			{/* кнопка */}
			<div className={`${mainstyles.button} ${'pt-10 pr-10'}`}>
				<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>{totalPrice}</p>
				<Button onClick={
					() => setOpen(true)}
					type='primary'
					size='medium'
					className={'text text_type_digits-medium'}>
					Оформить заказ
				</Button>
			</div>

			{order &&
				<Modal isOpen={open} onClose={() => setOpen(false)}>
					<OrderDetails number={`${order}`} id='идентификатор заказа' message='Ваш заказ начали готовить' recommendation='Дождитесь готовности на орбитальной станции' />
				</Modal>}
		</form>
	)
}

BurgerConstructor.propTypes = {
	data: ingredientType
}

export default BurgerConstructor;