export const URL = 'https://norma.nomoreparties.space/api';

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1200); //20 минут
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

// export const getUserRequest = () => {
//     return fetch(`${URL}/auth/user`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: getCookie('accessToken')
//         },
//     })

// }
// console.log(localStorage.getItem('refreshToken'), 'localStorage.getItem(refreshToken) ')

// export const getUser = () => (dispatch) => {
//     dispatch(getUserReq());
//     getUserRequest()
//         .then(async response => {
//             const isJson = response.headers.get('content-type').includes('application/json');
//             const data = isJson ? await response.json() : null;
//             console.log(data, 'data')

//             if (data.message === "jwt expired") {
//                 console.log(data.message === "jwt expired", 'res.message -1')
//                 fetch(`${URL}/auth/token`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
//                     })

//             }

//             if (!response.ok) {
//                 // get error message from body or default to response status
//                 const error = (data && data.message) || response.status;
//                 return Promise.reject(error);
//             } else {
//                 dispatch(getUserSucc(response.user))
//             }
//         })

//     .catch((err) => {
//         dispatch(getUserError(err));
//     })
// };