import { FC, useEffect } from "react";
import styleFeed from './feed-page-style.module.css';
import { FeedItem } from "../components/feed-item/feed-item";
import { FeedStatistics } from "../components/feed-statistics/feed-statistics";
import { useDispatch, useSelector } from "../services/reducers/root-reducer";
import { FeedListDone, FeedListInWork } from "../components/feed-list/feed-list";
import { wsConnectionClosed, wsConnectionStart } from "../services/actions/ws";
import { WS_URL } from "../utils/app-api";
import { TIngredient, TOrder } from "../utils/types";

export const Feed: FC = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionStart(WS_URL));
		return () => {
			dispatch(wsConnectionClosed());
		}
	}, []);

	const orders = useSelector((state) => state.ws.orders);
	const totalToday = useSelector((state) => state.ws.totalToday);
	const total = useSelector((state) => state.ws.total);
	const allingredientsApi = useSelector((state) => state.ingredients.ingredients);
	const ordersStatusDone: number[] = [];
	const ordersStatusInWork: number[] = [];

	orders?.forEach((order) => {
		if (order.status === 'done') {
			ordersStatusDone.push(order.number);
		} else {
			ordersStatusInWork.push(order.number);
		}
	})

	const ingredientsList = (el: TOrder) =>
		el?.ingredients.map(id => {
			return allingredientsApi.find(ingredient => id === ingredient._id)
		});

	let totalPrice = (el: TOrder) => ingredientsList(el).reduce((a: number, b) => a + (b as TIngredient)?.price, 0);

	return (
		<div className={styleFeed.container}>
			<p className='mb-5 pt-10 text text_type_main-large'>Лента заказов</p>
			<div className={styleFeed.wrapper}>
				<ul className={styleFeed.items}>

					{orders &&
						orders?.map((order, index) => {

							return (
								<FeedItem
									key={index}
									_id={order._id}
									number={order.number}
									name={order.name}
									data={order.createdAt}
									list={
										<ul className={styleFeed.list}>
											{
												ingredientsList(order) &&
												ingredientsList(order)?.slice(0, 6).map((ingredient, index) => {
													return (
														<li className={styleFeed.item}
															style={{ zIndex: ingredientsList(order).length - index }}
															key={index} >

															<img src={ingredient?.image_mobile}
																alt={ingredient?.name}
																className={styleFeed.image}
															/>

															{ingredientsList(order).length > 6 && index === 5 ?
																(<div className={styleFeed.counter}>
																	<p className='text text_type_main-default'>+{ingredientsList(order).length - 5}</p>
																</div>)
																: null}

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

				<FeedStatistics total={total} totalToday={totalToday}
					ready={ordersStatusDone &&
						ordersStatusDone.map((order) => {
							return (
								<FeedListDone number={order} key={order} />)
						})}
					inwork={ordersStatusInWork &&
						ordersStatusInWork && ordersStatusInWork.map((order) => {
							return (
								<FeedListInWork number={order} key={order} />)
						})}
				/>
			</div>
		</div>
	)
}