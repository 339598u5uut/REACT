import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from "prop-types";
import { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { addIngredient, addIngredientBun, deleteIngredient } from '../../services/actions/ingredient';
import { useDrop, useDrag } from "react-dnd";
import { getUser } from '../../services/actions/user';
import { createSelector } from "reselect";
import { ingredientsSelector } from '../burger-ingredients/burger-ingredients';
import { ARRAY_DRAG_MOVE } from '../../services/actions';
import { useHistory } from 'react-router-dom';

let totalPrice = [];

export const userIngredientsSelector = createSelector(
	ingredientsSelector, state => state.ingredient.ingredientItems,
	(ingredients, ingredientItems) => ingredientItems.map((el) => {
		const ingredientObject = ingredients.find((ingredient) => el._id === ingredient._id);
		const object = { ...ingredientObject, constructorId: el.constructorId }
		return object;
	})
)

function Layer({ index, moveIngredient, item }) {
	const dispatch = useDispatch();
	const ref = useRef(null);
	const [, dragRef] = useDrag({
		type: 'ingredient2',
		item: ({ _id: item._id, index }),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: "ingredient2",
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveIngredient(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const dragDropRef = dragRef(dropRef(ref));
	return (
		<li className={mainstyles.block} ref={dragDropRef} key={item.key}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={(() =>
					dispatch(deleteIngredient(item._id)))}
			/>
		</li>
	)
}

const BurgerConstructor = () => {

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const userIngredients = useSelector(userIngredientsSelector);
	const order = useSelector(state => state.order.order);
	const history = useHistory();

	let userIngredientsId = {
		"ingredients": []
	};

	for (let i = 0; i < userIngredients.length; i++) {
		userIngredientsId.ingredients.push(userIngredients[i]._id)

	};

	function getCheckout(event) {
		dispatch(getUser());
		event.preventDefault();
		if (!localStorage.getItem('refreshToken')) {
			history.replace({
				pathname: '/login',
			})
		} else {
			dispatch(getOrder(userIngredientsId));
		}
	};

	totalPrice = userIngredients.reduce((a, b) => a + b.price, 0);

	//элемент form
	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item) {
			if (item._id === '60d3b41abdacab0026a733c6'
				|| item._id === '60d3b41abdacab0026a733c7') {

				dispatch(addIngredientBun(item))
			} else {
				dispatch(addIngredient(item))
			}
		}
	});

	const moveIngredient = useCallback(
		(dragIndex, hoverIndex) => {

			const dragIngredient = userIngredients[dragIndex];
			if (dragIngredient) {
				const newIngredients = [...userIngredients];
				newIngredients.splice(dragIndex, 1);
				newIngredients.splice(hoverIndex, 0, dragIngredient);
				dispatch({ type: ARRAY_DRAG_MOVE, array: newIngredients });
			}
		}, [userIngredients])

	const bunId = useSelector(state => state.ingredient.ingredientBun);
	const arrayAllIngredientsfromApi = useSelector(state => state.ingredients.ingredients);
	const bun = arrayAllIngredientsfromApi.find(el => el._id === bunId._id);

	userIngredientsId.ingredients.push(bun, bun);

	return (
		<form className={`${mainstyles.order} ${'pl-10'}`} onSubmit={getCheckout} ref={dropTarget} >

			{bun &&
				<div className={`${mainstyles.block} ${'pl-8'}`}>
					<ConstructorElement
						type={"top"}
						isLocked={true}
						text={bun.name + ' ' + '(верх)'}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			}

			<ul className={mainstyles.wrapper_burger} >
				{userIngredients.filter((el) => el.type !== 'bun').map((userIngredient, index) => {

					return (
						<Layer
							key={userIngredient.constructorId}
							index={index}
							item={userIngredient}
							moveIngredient={moveIngredient}
						/>
					)
				})}
			</ul>

			{bun &&
				<div className={`${mainstyles.block} ${'pl-8'}`}>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name + ' ' + '(низ)'}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			}

			{/* кнопка */}
			<div className={`${mainstyles.button} ${'pt-10 pr-10'}`}>
				<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>
					{bun ?
						totalPrice = totalPrice + bun.price * 2 : totalPrice}</p>
				<Button onClick={
					() => setOpen(true)}
					type='primary'
					size='medium'
					className={'text text_type_digits-medium'}
					disabled={userIngredients.length && bun ? false : true}
				>
					Оформить заказ
				</Button>
			</div>

			{order && open &&
				<Modal onClose={() => setOpen(false)}>
					<OrderDetails
						number={`${order}`}
						id='идентификатор заказа'
						message='Ваш заказ начали готовить'
						recommendation='Дождитесь готовности на орбитальной станции' />
				</Modal>}
		</form>
	)
}

BurgerConstructor.propTypes = {
	moveIngredient: PropTypes.func,
	index: PropTypes.number,
}
export default BurgerConstructor;