import { FC, useEffect } from 'react';
import profileOrdersStyle from './profile-orders-page-style.module.css';
import { ProfileOrdersItem } from '../components/profile-orders-item/profile-orders-item';
import { ProfileMenu } from '../components/profile-menu/profile-menu';
import { getCookie, WS_ORDERS_URL } from '../utils/app-api';
import { useDispatch, useSelector } from '../services/reducers/root-reducer';
import { wsConnectionClosed, wsConnectionStart } from '../services/actions/ws';
import { TIngredient, TOrder } from '../utils/types';

export const ProfileOrdersPage: FC = () => {

	const dispatch = useDispatch();
	const accessToken = getCookie('accessToken')?.replace('Bearer', '').trim();

	useEffect(() => {
		dispatch(wsConnectionStart(`${WS_ORDERS_URL}?token=${accessToken}`));
		return () => {
			dispatch(wsConnectionClosed());
		}
	}, []);

	const orders = useSelector((state) => state.ws.orders);
	const allingredientsApi = useSelector((state) => state.ingredients.ingredients);

	const ingredientsList = (el: TOrder) =>
		el?.ingredients.map(id => {
			return allingredientsApi.find(ingredient => id === ingredient._id)
		});

	let totalPrice = (el: TOrder) => ingredientsList(el).reduce((a, b) => a + (b as TIngredient)?.price, 0);

	return (
		<main className={profileOrdersStyle.wrapper}>
			<ProfileMenu />
			<ul className={profileOrdersStyle.container}>

				{orders?.map((order, index) => {

					return (
						<ProfileOrdersItem
							number={order.number}
							data={order.createdAt.slice(0, 10) + ', ' + order.createdAt.slice(11, 19)}
							name={order.name}
							status={order.status}
							price={order.price}
							key={index}
							_id={order._id}
							list={
								<ul className={profileOrdersStyle.list}>
									{ingredientsList(order) &&
										ingredientsList(order).slice(0, 6).map((ingredient, index) => {

											return (
												<li className={profileOrdersStyle.item}
													style={{ zIndex: ingredientsList(order).length - index }}
													key={index} >

													<img src={ingredient?.image_mobile}
														alt={ingredient?.name}
														className={profileOrdersStyle.image}
													/>

													{ingredientsList(order).length > 6 && index === 5 ?
														(<div className={profileOrdersStyle.counter}>
															<p className='text text_type_main-default'>+{ingredientsList(order).length - 5}</p>
														</div>
														) : null}

												</li>
											)
										})
									}
								</ul>
							}
							totalPrice={totalPrice(order)}
						/>
					)
				})}

			</ul>
		</main>
	)
}