import {REQUEST_RECEIPT, FETCH_RECEIPT} from '../actionTypes/index.js';

const requestReceipt = (receipt) => {
    return ({
        type: REQUEST_RECEIPT,
        payload: receipt
    });
}

const fetchReceipt = (receipt) => {
    return ({
        type: FETCH_RECEIPT,
        payload: receipt
    });
} 

export {requestReceipt, fetchReceipt};