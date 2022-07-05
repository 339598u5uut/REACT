import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ingredientType from '../utils/types';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../services/app-context';
// import { getOrderRequest } from '../utils/app-api';


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

const LayerTop = (props) => {
	return (
		<div className={`${mainstyles.block} ${'pl-8'}`}>
			<ConstructorElement
				type={"top"}
				isLocked={true}
				text={props.name}
				price={props.price}
				thumbnail={props.image}
			/>
		</div>
	)
}

const LayerBottom = (props) => {
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
let number;
let totalPrice;
const BurgerConstructor = () => {
	const [open, setOpen] = React.useState(false);
	const { data, setData } = useContext(DataContext);

	//номер заказа из post-запроса
	// const [number, setNumber] = React.useState('');

	const sauce = data.filter(element => element.type === "sauce");
	const main = data.filter(element => element.type === "main");
	const bun = data.filter(element => element.type === "bun");
	const mediumLayer = sauce.concat(main);



	function getCheckout(event) {
		event.preventDefault();

		//попытка запроса номера заказа с усилителем
		// getOrderRequest()
		//   .then(setNumber)
		//   .catch(e => {
		// 	console.log(e)
		//   })


//массив id всех ингредиентов заказа для post-запроса, за исключением 2 булок
		const arrayIdIngredients = {
			"ingredients": []
		}

		const arrayPrice = []


		for (let i = 0; i < mediumLayer.length; i++) {
			arrayIdIngredients.ingredients.push(mediumLayer[i]._id)
			arrayPrice.push(mediumLayer[i].price)

		}
		totalPrice = arrayPrice.reduce((a, b) => a + b);
		//   console.log(totalPrice)


		fetch('http://norma.nomoreparties.space/api/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(arrayIdIngredients)

		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Ответ сервера не OK');
				}
				return res.json();
			})
			.then((number) => {
				number = number.order.number;
				console.log(number)
			}
			)
			.catch(e => {
				console.log(e)
			})
	};


	return (
		<form className={`${mainstyles.order} ${'pl-10'}`} onSubmit={getCheckout}>

			{/* верхняя булка */}
			{bun &&
				bun.map((bun) =>
					<LayerTop name={bun.name} price={bun.price} image={bun.image} />)
			}

			<div className={mainstyles.wrapper_burger}>
				{mediumLayer.length &&
					mediumLayer.map((mediumLayer, _id) =>
						<Layer key={mediumLayer._id} name={mediumLayer.name} price={mediumLayer.price} image={mediumLayer.image} calories={mediumLayer.calories}
							proteins={mediumLayer.proteins} fat={mediumLayer.fat} carbohydrates={mediumLayer.carbohydrates} />)}
			</div>

			{/* нижняя булка */}
			{bun &&
				bun.map((bun) =>
					<LayerBottom name={bun.name} price={bun.price} image={bun.image} />)
			}
			{/* кнопка */}
			<div className={`${mainstyles.button} ${'pt-10 pr-10'}`}>
				<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>{`${totalPrice}`}</p>
				<Button onClick={
					() => setOpen(true)}
					type='primary'
					size='medium'
					className={'text text_type_digits-medium'}>
					Оформить заказ
				</Button>
			</div>

			{/* модальное окно кнопки оформления заказа*/}
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<OrderDetails number={`${number}`} id='идентификатор заказа' message='Ваш заказ начали готовить' recommendation='Дождитесь готовности на орбитальной станции' />
			</Modal>
		</form>
	)
}

BurgerConstructor.propTypes = {
	data: ingredientType
}

export default BurgerConstructor;