import {SELECT_PRODUCT_DETAIL, REQUEST_PRODUCT_DETAIL, FETCH_PRODUCT_DETAIL, ERROR_PRODUCT_DETAIL} from '../actionTypes/index.js';

const productDetailReducer = (state={product: {}}, action) => {
    switch(action.type) {
        case SELECT_PRODUCT_DETAIL:
            return state;
        case REQUEST_PRODUCT_DETAIL:
            return {loading: true, product: {}};
        case FETCH_PRODUCT_DETAIL:
            return {loading: false, product: action.payload};
        case ERROR_PRODUCT_DETAIL:
            return {loading: false, product: action.payload};
        default:
            return state;
    }
}

export default productDetailReducer;