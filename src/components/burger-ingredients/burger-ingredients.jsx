import React from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TabComponent = () => {
	const [current, setCurrent] = useState('one')
	return (
		<div className={`${mainstyles.list} ${'mb-10'}`} >
			<Tab value="one" active={current === 'one'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="two" active={current === 'two'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="three" active={current === 'three'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	)
}

const Product = (props) => {
	return (
		<>
			<li className={`${mainstyles.item} ${'p-1'}`} >
				<img src={props.url} alt={props.name} />
				<div className={`${mainstyles.content_item}  ${'pb-2'}`}>
					<CurrencyIcon type="primary" />
					<span className={'text text_type_digits-default pl-2'}>{props.price}</span>
				</div>
				<p className={'text text_type_digits-small'}>{props.name}</p>
			</li>
		</>
	)
}

const BlockType = (props) => {
	return (
		<>
			<p className={'text text_type_digits-default'}>{props.type}</p>
			<div className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
				{props.children}
			</div>
		</>
	)
}

function BurgerIngredients({ data }) {
	const bun = data.filter(element => element.type === "bun");
	const sauce = data.filter(element => element.type === "sauce");
	const main = data.filter(element => element.type === "main");

	return (
		<>
			<div className={mainstyles.menu}>
				<div className={mainstyles.menuLeft}>
					<TabComponent />
					<ul className={mainstyles.ingredients}>
						<div className={mainstyles.wrapper}>

							<BlockType type={'Булки'}>
								{bun.length &&
									bun.map((bun, index) => <Product key={index} url={bun.image} price={bun.price} name={bun.name} />)}
							</BlockType>

							<BlockType type={'Соусы'}>
								{sauce.length &&
									sauce.map((sauce, index) => <Product key={index} url={sauce.image} price={sauce.price} name={sauce.name} />)}
							</BlockType>

							<BlockType type={'Основное меню'}>
								{main.length &&
									main.map((main, index) => <Product key={index} url={main.image} price={main.price} name={main.name} />)}
							</BlockType>
						</div>
					</ul>
				</div>

			</div>
		</>
	)
}

BurgerIngredients.propTypes = {
	className: PropTypes.string,
	price: PropTypes.number,
	name: PropTypes.string,
	current: PropTypes.string,
	value: PropTypes.string,
	active: PropTypes.bool,
	setCurrent: PropTypes.string,
	url: PropTypes.string,
	type: PropTypes.string,
	data: PropTypes.array,
	key: PropTypes.number,
}

export default BurgerIngredients;