import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ingredients } from '../services/actions/ingredients';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from './main-style.module.css';


function Main() {

	const dispatch = useDispatch();
	useEffect(() => {
		// @ts-ignore
		dispatch(ingredients())
	}, [dispatch]);

	return (
		<div className="App">		
			<main>
				<section className={style.section}>
					<p className={'text text_type_main-large mb-5'}>Соберите бургер</p>
					<div className={style.container}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DndProvider>
					</div>
				</section>
			</main>
		</div>
	);
};
export default Main;
