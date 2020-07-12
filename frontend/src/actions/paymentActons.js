import { ADD_PAYMENT } from "../actionTypes";

const addPayment = (paymentName) => {
    return ({
        type: ADD_PAYMENT,
        payload: paymentName
    })
}

export {addPayment};