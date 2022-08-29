import { useDispatch, useSelector } from "../services/reducers/root-reducer";
import { useEffect } from "react";
import { FC } from 'react';
import stylePageModal from "./page-modal-ingredient-style.module.css";
import { FeedDetales } from "../components/feed-detales/feed-detales";
import { ingredients } from "../services/actions/ingredients";
import { wsConnectionClosed, wsConnectionStart } from "../services/actions/ws";
import { useParams } from "react-router-dom";
import { FeedListIngredients } from "../components/feed-list/feed-list";
import { TOrder, TParamTypes } from "../utils/types";
import { WS_URL } from "../utils/app-api";

const FeedModalPage: FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ingredients());
        dispatch(wsConnectionStart(WS_URL));
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []);

    const allIngredients = useSelector((state) => state.ingredients.ingredients);
    const { id } = useParams<TParamTypes>();
    const orders = useSelector((state) => state.ws.orders);
    const findIngredient = orders.find(i => i._id === id);

    const ingredientsList = (findIngredient: TOrder | undefined) => allIngredients?.filter(item =>
        findIngredient?.ingredients.includes(item._id));
    let totalPrice = ingredientsList(findIngredient).reduce((a: number, b: { price: number; }) => a + b.price, 0);

    return (
        findIngredient ? (
            <main className={stylePageModal.main}>
                <div className={stylePageModal.container}>
                    <FeedDetales
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

export default FeedModalPage;