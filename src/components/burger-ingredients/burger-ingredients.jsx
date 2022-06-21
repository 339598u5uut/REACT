import React from 'react';
import mainstyles from './burger-ingredients-style.module.css';
import data from '../utils/data';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

// const TabComponent = () => {
// 	const [current, setCurrent] = useState('one')
// 	return (
// 	  <div style={{ display: 'flex' }}>
// 		<Tab value="one" active={current === 'one'} onClick={setCurrent}>
// 		  One
// 		</Tab>
// 		<Tab value="two" active={current === 'two'} onClick={setCurrent}>
// 		  Two
// 		</Tab>
// 		<Tab value="three" active={current === 'three'} onClick={setCurrent}>
// 		  Three
// 		</Tab>
// 	  </div>
// 	)
//   }

const Product = (props) => {		
	return (
		<>
			<li className={mainstyles.item} >
				<img src={props.url} alt={props.name} />
				<div className={'pb-2'} style={{ display: 'flex' }}>
					<CurrencyIcon type="primary" />
					<span className={'text text_type_digits-default pl-2'}>{props.price}</span>
				</div>
				<p className={'text text_type_digits-small'}>{props.name}</p>
			</li>
		</>
	)
}

function BurgerIngredients(props) {
	return (
		<>
			<div className={mainstyles.menu}>
				<div className={mainstyles.menuLeft}>

					{/* <TabComponent/>  */}

					<nav className={mainstyles.nav}>
						<ul className={mainstyles.list}>
							<li className={'text text_type_main-default'}><a href={props.url} className={'pl-2'}>Булки</a></li>
							<li className={'text text_type_main-default'}><a href={props.url} className={'pl-2'}>Соусы</a></li>
							<li className={'text text_type_main-default'}><a href={props.url} className={'pl-2'}>Начинки</a></li>
						</ul>
					</nav>

					<ul className={mainstyles.ingredients}>
						<div className={mainstyles.wrapper}>
							<p className={'text text_type_digits-default'}>Булки</p>
							<div className={`${mainstyles.ingredients_position} ${mainstyles.ingredients_position_bun}`}>
								<Product url={data[0].image} price={'20'} name={'Краторная булка N-200i'} />
								<Product url={data[14].image} price={'20'} name={'Флюоресцентная булка R2-D3'} />
							</div>

							<p className={'text text_type_digits-default'}>Соусы</p>
							<div className={mainstyles.ingredients_position}>
								<Product url={data[3].image} price={'30'} name={'Соус Spicy-X'} />
								<Product url={data[4].image} price={'30'} name={'Соус фирменный Space Sauce'} />
								<Product url={data[7].image} price={'30'} name={'Соус фирменный Space Sauce'} />
								<Product url={data[8].image} price={'30'} name={'Соус фирменный Space Sauce'} />
							</div>
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
	name:PropTypes.string	
}

export default BurgerIngredients;