import { REQUEST_RECEIPT, FETCH_RECEIPT } from "../actionTypes";

const receiptReducer = (state={receipt: []}, action) => {
    switch(action.type) {
        case REQUEST_RECEIPT:
            return ({
                loading: true,
                receipt: action.payload
            });
        case FETCH_RECEIPT:
            return ({
                loading: false,
                receipt: action.payload
            })
        default:
            return state;
    }
}

export default receiptReducer;