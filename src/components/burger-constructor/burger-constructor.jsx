import React from 'react';
import mainstyles from './burger-constructor-style.module.css';
import { ConstructorElement,Button,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import imgbun from '../../images/bun.png';
import imgsouse from '../../images/sauce.png';
import imgmeat from '../../images/meat.png';
import imgmineralrings from '../../images/mineralrings.png';
import imgsp from '../../images/sp.png';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {
	render() {
		return (
			<div className={`${mainstyles.order} ${'pl-4'}`}>
				<div className={`${mainstyles.block} ${mainstyles.block_bun}`}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={20}
						thumbnail={imgbun}
					/>
				</div>
				
				<div className={mainstyles.wrapper_burger}>
					<div className={mainstyles.block}>
						<DragIcon type='primary' />
						<ConstructorElement
							text='Соус традиционный галактический'
							price={30}
							thumbnail={imgsouse}
						/>
					</div>

					<div className={mainstyles.block}>
						<DragIcon type='primary' />
						<ConstructorElement
							text='Мясо бессмертных моллюсков Protostomia'
							price={300}
							thumbnail={imgmeat}
						/>
					</div>

					<div className={mainstyles.block}>
						<DragIcon type='primary' />
						<ConstructorElement
							text='Плоды Фалленианского дерева'
							price={80}
							thumbnail={imgsp}
						/>
					</div>

					<div className={mainstyles.block}>
						<DragIcon type="primary" />
						<ConstructorElement
							text='Хрустящие минеральные кольца'
							price={80}
							thumbnail={imgmineralrings}
						/>
					</div>

					<div className={mainstyles.block}>
						<DragIcon type='primary' />
						<ConstructorElement
							text='Хрустящие минеральные кольца'
							price={80}
							thumbnail={imgmineralrings}
						/>
					</div>
				</div>

				<div className={`${mainstyles.block} ${mainstyles.block_bun} ${mainstyles.block_bun_last}`}>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={20}
						thumbnail={imgbun}
					/>
				</div>

				<div className={`${mainstyles.button} ${'pt-10'}`}>
					<p className={`${mainstyles.icon} ${"text text_type_digits-medium mr-10 pr-10"}`}>610</p>
					<Button type='primary' size='medium'>
						Оформить заказ
					</Button>
				</div>
			</div>
		)
	}
}

BurgerConstructor.propTypes = {
	className: PropTypes.string,
	text:PropTypes.string,
	price:PropTypes.number,
	isLocked:PropTypes.bool
}

export default BurgerConstructor;