import { ADD_ORDER, REQUEST_ORDER, FETCH_ORDER } from "../actionTypes";

const addOrder = (orders) => {
    return ({
        type: ADD_ORDER,
        payload: orders
    });
}

const requestOrders = (orders) => {
    return ({
        type: REQUEST_ORDER,
        payload: orders
    })
}

const fetchOrders = (orders) => {
    return ({
        type: FETCH_ORDER,
        payload: orders
    })
}

export {addOrder, requestOrders, fetchOrders};