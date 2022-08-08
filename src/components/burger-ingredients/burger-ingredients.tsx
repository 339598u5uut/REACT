import React, { FC, useState } from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import { CurrencyIcon, Tab as TabUI, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { getIngredient } from '../../services/actions/ingredient-detales';
import { createSelector } from 'reselect';
import { useLocation, Link } from 'react-router-dom';
import { RootState } from '../../services/reducers/root-reducer';
import { TIngredient, TReduceAcc, TReduceCur, TProduct } from '../../utils/types';

export const Tab: FC<{
	active: boolean;
	value: string;
	onClick: (value: string) => void;
	children?: React.ReactNode;
}> = TabUI;


export const ingredientsSelector = (state: any = {}) => state.ingredients.ingredients;

const Product: FC<TProduct> = ({ count, image, _id, name, price, handleOpenModal }) => {
	const location = useLocation();
	let ingredientId = _id;

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { _id: _id },
	})

	return (
		<>
			<Link
				to={{
					pathname: `/ingredients/${ingredientId}`,
					state: { background: location },
				}}
			>
				<li className={`${mainstyles.item} ${'p-1'}`} ref={dragRef} {...handleOpenModal}>
					{count !== 0 ?
						<div className={mainstyles.counter}><Counter count={count} size="default" /></div> : <></>}
					<img src={image} alt={name} />
					<div className={`${mainstyles.content_item}  ${'pb-2'}`}>
						<CurrencyIcon type="primary" />
						<span className={'text text_type_main-default pl-2'}>{price}</span>
					</div>
					<p className={'text text_type_main-small'}>{name}</p>
				</li>
			</Link>
		</>
	)
}

const allIngredientsSelector = createSelector((state: any) => state.ingredient,
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

	const handleOpenModal = (props: TIngredient): void => {
		dispatch(getIngredient(props));
	};

	function handleScroll(e: React.SyntheticEvent<HTMLDivElement>) {
		const target = e.target as HTMLElement;
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

	const counter = userIngredients.reduce((acc: TReduceAcc, cur: TReduceCur) => {
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

	const bun: TIngredient[] = ingredients.filter((element: TIngredient) => element.type === "bun");
	const sauce: TIngredient[] = ingredients.filter((element: TIngredient) => element.type === "sauce");
	const main: TIngredient[] = ingredients.filter((element: TIngredient) => element.type === "main");

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
								bun.map((bun, _id) => <Product src={''} key={bun._id} {...bun} count={counter[bun._id] || 0} handleOpenModal={handleOpenModal} />)}
						</ul>

						<p className={'text text_type_main-medium'} id='sauce'>Соусы</p>
						<ul className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{!!sauce.length &&
								sauce.map((sauce, _id) => <Product src={''} key={sauce._id} {...sauce} count={counter[sauce._id] || 0} handleOpenModal={handleOpenModal} />)}
						</ul>

						<p className={'text text_type_main-medium'} id='main'>Начинки</p>
						<ul className={`${mainstyles.ingredients_position} ${'mb-10'}`}>
							{!!main.length &&
								main.map((main, _id) => <Product src={''} key={main._id} {...main} count={counter[main._id] || 0} handleOpenModal={handleOpenModal} />)}
						</ul>

					</div >
				</div>
			</div >
		</div >
	)
}

export default BurgerIngredients;