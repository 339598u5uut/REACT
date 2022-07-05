import { getIngredientsRequest } from "../../components/utils/app-api";
// import { getOrderRequest } from "../../components/utils/app-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const SHOW_MODAL = 'SHOW_MODAL';
export const NOT_SHOW_MODAL = 'SHOW_MODAL';

//middleware, при загрузке страницы, весь список ингредиентов
export function getIngredients() {
    return function(dispatch) {

        dispatch({
                type: GET_INGREDIENTS_REQUEST
            })
            // Запрашиваем данные у сервера
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    feed: res.data
                })
            } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                })
            }
        }).catch(err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: GET_INGREDIENTS_ERROR
            })
        })
    }
}

//middleware, кнопка 'оформить заказ'
// export function getOrder() {
//     return function(dispatch) {

//         dispatch({
//             type: GET_ORDER_REQUEST
//         })
//         getOrderRequest().then(res => {
//             if (res && res.success) {
//                 dispatch({
//                     type: GET_ORDER_SUCCESS,
//                     feed: res.data
//                 })
//             } else {
//                 dispatch({
//                     type: GET_ORDER_ERROR
//                 })
//             }
//         }).catch(err => {
//             dispatch({
//                 type: GET_ORDER_ERROR
//             })
//         })
//     }
// }