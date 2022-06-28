import React from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';

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
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<button onClick={() => setOpen(true)} className={mainstyles.button}>
				<li className={`${mainstyles.item} ${'p-1'}`} >
					<img src={props.image} alt={props.name} />
					<div className={`${mainstyles.content_item}  ${'pb-2'}`}>
						<CurrencyIcon type="primary" />
						<span className={'text text_type_digits-default pl-2'}>{props.price}</span>
					</div>
					<p className={'text text_type_digits-small'}>{props.name}</p>
				</li>
			</button>
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<IngredientDetails image={props.image} name={props.name} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} />
			</Modal>
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
		<div className={mainstyles.menu}>
			<div className={mainstyles.menuLeft}>
				<TabComponent />
				<ul className={mainstyles.ingredients}>
					<div className={mainstyles.wrapper}>

						<BlockType type={'Булки'}>
							{bun.length &&
								bun.map((bun, _id) => <Product key={bun._id} url={bun.image} price={bun.price} name={bun.name} image={bun.image} calories={bun.calories} proteins={bun.proteins} fat={bun.fat} carbohydrates={bun.carbohydrates} />)}
						</BlockType>

						<BlockType type={'Соусы'}>
							{sauce.length &&
								sauce.map((sauce, _id) => <Product key={sauce._id} url={sauce.image} price={sauce.price} name={sauce.name} image={sauce.image} calories={sauce.calories} proteins={sauce.proteins} fat={sauce.fat} carbohydrates={sauce.carbohydrates} />)}
						</BlockType>

						<BlockType type={'Основное меню'}>
							{main.length &&
								main.map((main, _id) => <Product key={main._id} url={main.image} price={main.price} name={main.name} image={main.image} calories={main.calories} proteins={main.proteins} fat={main.fat} carbohydrates={main.carbohydrates} />)}
						</BlockType>
					</div>
				</ul>
			</div>
		</div>
	)
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		calories: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
	})).isRequired,
}

export default BurgerIngredients;