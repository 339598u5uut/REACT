import { FC, useEffect } from "react";
import orderModalStyle from './order-modal-page-style.module.css';
import { useDispatch, useSelector } from "../services/reducers/root-reducer";
import { ingredients } from "../services/actions/ingredients";
import { wsConnectionStart } from "../services/actions/ws";
import { getCookie, WS_ORDERS_URL } from "../utils/app-api";
import { TOrder, TParamTypes } from "../utils/types";
import { useParams } from "react-router-dom";
import { FeedListIngredients } from "../components/feed-list/feed-list";
import OrderProfileDetails from "../components/order-profile-details/order-profile-details";

export const OrderModalPage: FC = () => {

    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken')?.replace('Bearer', '').trim();

    useEffect(() => {
        dispatch(ingredients());
        dispatch(wsConnectionStart(`${WS_ORDERS_URL}?token=${accessToken}`));
    }, [accessToken]);

    const allIngredients = useSelector((state) => state.ingredients.ingredients);
    const { id } = useParams<TParamTypes>();
    const orders = useSelector((state) => state.ws.orders);
    const findIngredient = orders.find(i => i._id === id);

    const ingredientsList = (findIngredient: TOrder | undefined) => allIngredients?.filter(item =>
        findIngredient?.ingredients.includes(item._id));
    let totalPrice = ingredientsList(findIngredient).reduce((a: number, b: { price: number; }) => a + b.price, 0);

    return (

        findIngredient ? (
            <main className={orderModalStyle.main}>
                <div className={orderModalStyle.container}>
                    <OrderProfileDetails
                        number={findIngredient.number}
                        name={findIngredient.name}
                        status={findIngredient.status}
                        price={findIngredient.price}
                        createdAt={findIngredient.createdAt}
                        totalPrice={totalPrice}
                        children={
                            ingredientsList(findIngredient).map((order) => {
                                return (
                                    <FeedListIngredients
                                        name={order.name}
                                        price={order.price}
                                        key={order._id}
                                        image={order.image_mobile}
                                        counter={ingredientsList(findIngredient).filter(value =>
                                            value._id === findIngredient._id).length + 1} />
                                )
                            })
                        } />
                </div>
            </main>
        ) : null
    )
}