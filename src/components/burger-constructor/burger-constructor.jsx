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
import { deleteIngredient } from '../../services/actions/ingredient';
import { useDrop } from "react-dnd";
import {createSelector} from "reselect";
import { ingredientsSelector } from '../burger-ingredients/burger-ingredients';
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

// export const LayerBottom = (props) => {
// 	return (
// 		<div className={`${mainstyles.block} ${'pl-8'}`}>
// 			<ConstructorElement
// 				type="bottom"
// 				isLocked={true}
// 				text={props.name}
// 				price={props.price}
// 				thumbnail={props.image}
// 			/>
// 		</div>
// 	)
// }

const userIngredientsSelector = createSelector(
	ingredientsSelector,state => state.ingredient.ingredientItems,
	(ingredients,ingredientItems)=>ingredientItems.map((el)=>{
	const ingredientObject =ingredients.find((ingredient)=>el._id===ingredient._id)
	// console.log(ingredientObject, "ingredientObject")
	return ingredientObject
	})
	)




	
const BurgerConstructor = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();


	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item) {
			dispatch(addIngredient(item));
			// console.log(item, 'item')
		},
	});


	
	
	const order = useSelector(state => state.order.order)

const userIngredients =  useSelector(userIngredientsSelector)

// console.log(userIngredients,"userIngredients")


	totalPrice = userIngredients.reduce((a, b) => a + b.price, 0)
		

	// @ts-ignore
	function getCheckout(event) {
		event.preventDefault();
		dispatch(getOrder());
	};

	return (
		<form className={`${mainstyles.order} ${'pl-10'}`} onSubmit={getCheckout}  ref={dropTarget} >


{userIngredients.filter((el)=>el.type ==='bun').map((userIngredient) =>
						{	
				 <div className={`${mainstyles.block} ${'pl-8'}`}>
					<ConstructorElement
						type={"top"}
						isLocked={true}
						text={userIngredient.name}
						price={userIngredient.price}
						thumbnail={userIngredient.image}
					/>
				</div> })}


			<div className={mainstyles.wrapper_burger} >
			
					{userIngredients.filter((el)=>el.type !=='bun').map((userIngredient) =>
						{
							return(<div className={mainstyles.block} key={userIngredient._id} >
								<DragIcon type='primary' />
								<ConstructorElement
									text={userIngredient.name}
									price={userIngredient.price}
									thumbnail={userIngredient.image}
									handleClose={(() => dispatch(deleteIngredient(userIngredient._id)))}								
								/>
							</div>)
						})}					
			</div>

			{userIngredients.filter((el)=>el.type ==='bun').map((userIngredient) =>
						{		
		 <div className={`${mainstyles.block} ${'pl-8'}`}>		
			<ConstructorElement
				type="bottom"
				isLocked={true}
				text={userIngredient.name}
				price={userIngredient.price}
				thumbnail={userIngredient.image}
			/>
		</div>})}
	



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