import { FC } from "react";
import feedIdStyle from './feed-detales-style.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TParamTypes, TFeedDetales, TIngredient } from "../../utils/types";
import { useSelector } from "../../services/reducers/root-reducer";
import { useParams } from "react-router-dom";
import { FeedListIngredients } from "../feed-list/feed-list";


export const FeedDetales: FC<TFeedDetales> = ({ number, name, status, price, createdAt, totalPrice, children }): JSX.Element | null => {

	const allIngredients = useSelector((state) => state.ingredients.ingredients);
	const { id } = useParams<TParamTypes>();
	const orders = useSelector((state) => state.ws.orders);
	const findIngredient = orders.find(i => i._id === id);
	const findIngredientsId = findIngredient?.ingredients;

	const ingredientsList = (findIngredientsId: string[]) =>
		findIngredientsId?.map(id => {
			return allIngredients.find(ingredient => id === ingredient._id)
		});

	function unique(arr: (TIngredient | undefined)[]) {
		let result: TIngredient[] = [];
		for (let ingr of arr) {
			if (!result.includes(ingr as TIngredient)) {
				result.push(ingr as TIngredient);
			}
		}
		return result;
	}

	totalPrice = ingredientsList(findIngredientsId as string[])?.reduce((a, b) => a + (b as TIngredient).price, 0);

	let counter = (order: TIngredient) => ingredientsList(findIngredientsId as string[]).filter(value =>
		(value as TIngredient)._id === order?._id).length || 1;

	return (
		findIngredient ? (

			<div className={feedIdStyle.container}>
				<p className={`${feedIdStyle.textAlign} ${'mb-10 text text_type_digits-default'}`}>#{findIngredient.number}</p>
				<p className='mb-3 text text_type_main-medium'>{findIngredient.name}</p>
				<p className={`${feedIdStyle.textColor} ${'text text_type_main-default mb-5'}`}>{findIngredient.status}</p>
				<p className='mb-6 text_type_main-medium'>Состав:</p>
				<ul className={`${feedIdStyle.list} ${'pt-4 pb-2'}`}>

					{unique(ingredientsList(findIngredientsId as string[])).map((order, index) => {

						return (
							<FeedListIngredients
								name={order.name}
								price={order.price}
								key={index}
								image={order.image_mobile}
								counter={counter(order)}

							/>
						)
					})}

				</ul>
				<div className={`${feedIdStyle.info} ${'pt-5'}`}>
					<div className='text text_type_main-default text_color_inactive'>{findIngredient.createdAt.slice(0, 10) + ', ' + findIngredient.createdAt.slice(11, 19)}</div>
					<div className={feedIdStyle.totalPrice}>
						<span className='text text_type_digits-default'>{totalPrice}</span>
						<CurrencyIcon type={"primary"} />
					</div>

				</div>
			</div>
		) : null
	)
}