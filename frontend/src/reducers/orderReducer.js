import { ADD_ORDER, REQUEST_ORDER, FETCH_ORDER } from "../actionTypes";

const orderReducer = (state={orders: []}, action) => {
    switch(action.type) {
        case ADD_ORDER:
            return ({
                orders: action.payload
            });
        case REQUEST_ORDER:
            return ({
                loading: true,
                orders: action.payload
            });
        case FETCH_ORDER:
            return ({
                loading: false,
                orders: action.payload
            })
        default:
            return state;
    }
}

export default orderReducer;