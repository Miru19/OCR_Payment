import { API_URL } from '@env';

const getPlateNumber = (platePicB64) => {
    return fetch(API_URL + '/getPlateNumber', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ upload: platePicB64 })
    })
};
const doSignUp = (body) => {
    return fetch(API_URL + '/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
};

const doSignIn = (body) => {
    return fetch(API_URL + '/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
};
const getZonePrice = (zone) => {
    return fetch(API_URL + '/payments/getzoneprice?zone='+zone, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })
};
const payParking = (body) => {
    return fetch(API_URL + '/payments/addPayment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
};
const getHistory = async (userId) => {
    const result = await fetch(API_URL + '/payments/getPayments?userId='+userId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await result.json();
    return json;
}

export default {
    getPlateNumber,
    doSignIn,
    doSignUp,
    getZonePrice,
    payParking,
    getHistory
}