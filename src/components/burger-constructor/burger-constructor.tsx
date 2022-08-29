/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
import React, { useState, useRef, useCallback, FC } from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../Button';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from '../../services/reducers/root-reducer';
import { getOrder, openOrderModal } from '../../services/actions/order';
import { addIngredient, addIngredientBun, deleteIngredient } from '../../services/actions/ingredient';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from "react-dnd";
import { getUser } from '../../services/actions/user';
import { createSelector } from "reselect";
import { ingredientsSelector } from '../burger-ingredients/burger-ingredients';
import { useHistory } from 'react-router-dom';
import { arrayDragMove, clearConstructor } from '../../services/actions/ingredient';
import { OrderDetails } from '../order-details/order-details';
import { TLayerProps, TIngredient, TUserIngredientsId, TIngredientInState } from '../../utils/types';
import { getCookie } from '../../utils/app-api';

export const userIngredientsSelector = createSelector(
	ingredientsSelector, (state: { ingredient: { ingredientItems: TIngredientInState[] } }) => state.ingredient.ingredientItems,
	(ingredients: TIngredient[], ingredientItems) => ingredientItems.map((el: TIngredientInState) => {
		const ingredientObject = ingredients.find((ingredient: TIngredient) => el._id === ingredient._id);
		const object = { ...ingredientObject, constructorId: el.constructorId }
		return object;
	})
)

const Layer: FC<TLayerProps> = ({ index, moveIngredient, item }) => {

	const dispatch = useDispatch();
	const ref = useRef<HTMLLIElement>(null);

	const [, dragRef] = useDrag({
		type: 'ingredient2',
		item: ({ _id: item._id, index }),
		collect: (monitor: DragSourceMonitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, dropRef] = useDrop({
		accept: "ingredient2",
		hover: (item: TIngredient, monitor: DropTargetMonitor) => {
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
			const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

			if (dragIndex! < hoverIndex && hoverActualY < hoverMiddleY) return;
			if (dragIndex! > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveIngredient(dragIndex, hoverIndex);
			item.index = hoverIndex;

		},
	});
	dragRef(dropRef(ref));

	return (
		<li className={mainstyles.block} ref={ref} key={item.key} >
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

const BurgerConstructor: FC = () => {

	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const order = useSelector((state) => state.order.order);
	const load = useSelector((state) => state.order.isFetching);
	const history = useHistory();
	const userIngredients = useSelector(userIngredientsSelector);

	let userIngredientsId: TUserIngredientsId = {
		"ingredients": []
	};

	for (let i = 0; i < userIngredients.length; i++) {
		userIngredientsId.ingredients.push(userIngredients[i]._id as string)
	};

	const getCheckout = (event: React.SyntheticEvent) => {
		dispatch(getUser());
		event.preventDefault();
		if (!localStorage.getItem('refreshToken') && !getCookie('accessToken')) {
			history.replace({
				pathname: '/login',
			})
		} else {
			dispatch(getOrder(userIngredientsId));
			if (order >= 0) {
				dispatch(clearConstructor());
			}
		}
	};

	let totalPrice = userIngredients.reduce((a, b) => a + (b as TIngredient).price, 0);

	//элемент form
	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item: TIngredientInState) {
			if (item._id === '60d3b41abdacab0026a733c6'
				|| item._id === '60d3b41abdacab0026a733c7') {
				dispatch(addIngredientBun(item))
			} else {
				dispatch(addIngredient(item))
			}
		}
	});

	const moveIngredient = useCallback(
		(dragIndex: any, hoverIndex: number) => {
			const dragIngredient = userIngredients[dragIndex];

			if (dragIngredient) {
				const newIngredients = [...userIngredients];
				console.log(newIngredients, 'newIngredients')
				newIngredients.splice(dragIndex, 1);
				newIngredients.splice(hoverIndex, 0, dragIngredient);
				dispatch(arrayDragMove(newIngredients as Array<TIngredient>));
			}
		}, [userIngredients])


	const bunId = useSelector((state) => state.ingredient.ingredientBun);
	const arrayAllIngredientsfromApi = useSelector((state) => state.ingredients.ingredients);
	const bun = arrayAllIngredientsfromApi.find((el) => el._id === bunId._id);


	return (
		<form className={`${mainstyles.order} ${'pl-10'}`} onSubmit={getCheckout} ref={dropTarget} >

			{bun && userIngredientsId.ingredients.push(bun._id, bun._id) &&

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
							moveIngredient={moveIngredient}
							item={userIngredient as TIngredient}
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

			{load && open &&
				<Modal onClose={() => setOpen(false)} name={''} />}

			{!!order && open &&
				<Modal onClose={() => setOpen(false)} name={''}>
					<OrderDetails
						number={order}
						id='идентификатор заказа'
						message='Ваш заказ начали готовить'
						recommendation='Дождитесь готовности на орбитальной станции' />
				</Modal>}
		</form>
	)
}

export default BurgerConstructor;