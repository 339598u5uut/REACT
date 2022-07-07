import React from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ingredientType from '../../utils/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef} from 'react';


// const bunRef = useRef(null);
//   const sauceRef = useRef(null);
//   const mainRef = useRef(null);

const TabComponent = () => {
	const [current, setCurrent] = useState('one')
	return (
		<div className={`${mainstyles.list} ${'mb-10'}`} >
			<a className={mainstyles.link} href="#bun">
				<Tab value="one" active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
			</a>
			<a className={mainstyles.link} href="#sauce">
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
			</a>
			<a className={mainstyles.link} href="#main">
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</a>
		</div>
	)
}

const Product = (props,  {_id}) => {
	const [open, setOpen] = React.useState(false);



	const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { _id },      
    })


	const [count, setCount] = useState(0);
	const addCount = () => setCount(count + 1);
	
	return (	
		<>
			<button onClick={() => setOpen(true)} className={mainstyles.button}>
			<div className={mainstyles.counter}><Counter count={count} size="default" /></div>
				<li className={`${mainstyles.item} ${'p-1'}`}  ref={dragRef}>
					<img src={props.image} alt={props.name} />
					<div className={`${mainstyles.content_item}  ${'pb-2'}`}>
						<CurrencyIcon type="primary" />
						<span className={'text text_type_main-default pl-2'}>{props.price}</span>
					</div>
					<p className={'text text_type_main-small'}>{props.name}</p>
				</li>
			</button>
			<Modal isOpen={open} onClose={() => setOpen(false)}>
				<IngredientDetails image={props.image} name={props.name} calories={props.calories} proteins={props.proteins} fat={props.fat} carbohydrates={props.carbohydrates} />
			</Modal>
		</>
	)
}


const ingredientsSelector = (state = {}) => state.ingredients.ingredients;

function BurgerIngredients() {

		
	const ingredients = useSelector(ingredientsSelector);

	const bun = ingredients.filter(element => element.type === "bun");
	const sauce = ingredients.filter(element => element.type === "sauce");
	const main = ingredients.filter(element => element.type === "main");

	return (
		<div className={mainstyles.menu}>
			<div className={mainstyles.menuLeft}>
				<TabComponent />
				<ul className={mainstyles.ingredients}>
					<div className={mainstyles.wrapper}>

						<p className={'text text_type_main-medium'} id='bun'>Булки</p>
						<li className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{bun.length &&
								bun.map((bun, _id) => <Product key={bun._id} {...bun} />)}
						</li>

						<p className={'text text_type_main-medium'} id='sauce'>Соусы</p>
						<li className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{sauce.length &&
								sauce.map((sauce, _id) => <Product key={sauce._id} {...sauce} />)}
						</li>

						<p className={'text text_type_main-medium'} id='main'>Начинки</p>
						<li className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{main.length &&
								main.map((main, _id) => <Product key={main._id}{...main} />)}
						</li>
					</div >
				</ul>
			</div >
		</div >
	)
}

BurgerIngredients.propTypes = {
	data: ingredientType
}

export default BurgerIngredients;