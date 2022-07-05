const URL = 'https://norma.nomoreparties.space/api';

export const getIngredientsRequest = () => {
    return fetch(`${URL}/ingredients`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Ответ сервера не OK');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(e => {
            return Promise.reject(e)
        })
};

// export const getOrderRequest = () => {
//     return fetch(`${URL}/orders`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(arrayIdIngredients)
//     })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Ответ сервера не OK');
//             }
//             return res.json();
//         })
//         .then(data => {
//             return data.data;
//         })
//         .catch(e => {
//             return Promise.reject(e)
//         })
// };