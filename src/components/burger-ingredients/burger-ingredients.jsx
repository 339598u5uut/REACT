import React from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { getIngredient,openIngredientModal } from '../../services/actions/ingredient-detales';
// import { deleteIngredient } from '../../services/actions/ingredient-detales';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { createSelector } from 'reselect';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export const ingredientsSelector = (state = {}) => state.ingredients.ingredients;

const Product = (props) => {

	const { count,openModal } = props;
	const location = useLocation();
	 let ingredientId = props._id;
	

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { _id: props._id },
	})
	
	return (
		<>
			<Link
				to={{ pathname: `/ingredients/${ingredientId}`, 
				state: { background: location },
				
			 }}
			>
				<li className={`${mainstyles.item} ${'p-1'}`} onClick={() => openModal(props)} ref={dragRef}>
					{count !== 0 ?
						<div className={mainstyles.counter}><Counter count={count} size="default" /></div> : <></>}
					<img src={props.image} alt={props.name} />
					<div className={`${mainstyles.content_item}  ${'pb-2'}`}>
						<CurrencyIcon type="primary" />
						<span className={'text text_type_main-default pl-2'}>{props.price}</span>
					</div>
					<p className={'text text_type_main-small'}>{props.name}</p>
				</li>
			</Link>			
		</>
	)
	
}

const allIngredientsSelector = createSelector((state) => state.ingredient,
	({ ingredientItems, ingredientBun }) => {

		if (ingredientBun && ingredientBun._id) {
			return [...ingredientItems, ingredientBun]
		}
		return ingredientItems;
	})

function BurgerIngredients() {
	const [current, setCurrent] = useState('one')
	const dispatch = useDispatch();
	
	const ingredients = useSelector(ingredientsSelector);
	const userIngredients = useSelector(allIngredientsSelector);

	

	function handleOpenModal(props){
		dispatch(getIngredient(props));
		dispatch(openIngredientModal(props));
	};

	function handleScroll(e) {
		const target = e.target;
		const scrollTop = target.scrollTop;
		if (scrollTop <= 265) {
			setCurrent('one')
		}
		if (scrollTop >= 266) {
			setCurrent('two')
		}
		if (scrollTop >= 680) {
			setCurrent('three')
		}
	}

	

	const counter = userIngredients.reduce((acc, cur) => {

		if (acc[cur._id]) {
			return {
				...acc,
				[cur._id]: acc[cur._id] + 1
			}
		} else {
			return {
				...acc,
				[cur._id]: 1
			}
		}
	}, {});


	const bun = ingredients.filter(element => element.type === "bun");
	const sauce = ingredients.filter(element => element.type === "sauce");
	const main = ingredients.filter(element => element.type === "main");

	return (
		<div className={mainstyles.menu}>
			<div className={mainstyles.menuLeft}>

				{/* табы */}
				<div className={`${mainstyles.list} ${'mb-10'}`} >
					<a className={mainstyles.link} href="#bun">
						<Tab value="one" active={current === 'one'} onClick={setCurrent}>
							Булки
						</Tab>
					</a>
					<a className={mainstyles.link} href="#sauce">
						<Tab value="two" active={current === 'two'} onClick={setCurrent} >
							Соусы
						</Tab>
					</a>
					<a className={mainstyles.link} href="#main">
						<Tab value="three" active={current === 'three'} onClick={setCurrent} >
							Начинки
						</Tab>
					</a>
				</div>
				{/* табы */}


				<div className={mainstyles.ingredients}  >
					<div className={mainstyles.wrapper} onScroll={handleScroll}>


						<p className={'text text_type_main-medium'} id='bun'>Булки</p>
						<ul className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{!!bun.length &&
								bun.map((bun, _id) => <Product key={bun._id} {...bun} count={counter[bun._id] || 0} openModal={handleOpenModal}/>)}
						</ul>


						<p className={'text text_type_main-medium'} id='sauce'>Соусы</p>
						<ul className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{!!sauce.length &&
								sauce.map((sauce, _id) => <Product key={sauce._id} {...sauce} count={counter[sauce._id] || 0} openModal={handleOpenModal}/>)}
						</ul>

						<p className={'text text_type_main-medium'} id='main'>Начинки</p>
						<ul className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{!!main.length &&
								main.map((main, _id) => <Product key={main._id}{...main} count={counter[main._id] || 0} openModal={handleOpenModal}/>)}
						</ul>


					</div >
				</div>
			</div >
		</div >
	)
}

export default BurgerIngredients;