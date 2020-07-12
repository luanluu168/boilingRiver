import {ADD_PRODUCT, SELECT_PRODUCT, FETCH_PRODUCT, ERROR_PRODUCT, REQUEST_PRODUCT, DELETE_PRODUCT, SEARCH_PRODUCT} from '../actionTypes/index.js';

const productReducer = (state={products: []}, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
            return state;
        case SELECT_PRODUCT:
            return state;
        case FETCH_PRODUCT:
            return { loading: false, products: action.payload };
        case REQUEST_PRODUCT:
            return { loading: true, products: [] };
        case ERROR_PRODUCT:
            return { loading: false, products: action.payload };
        case DELETE_PRODUCT:
            let updateProducts = state.products.filter(element => element.id !== action.payload);
            return { loading: false, products: updateProducts }
        case SEARCH_PRODUCT:
            return { loading: false, products: action.payload }
        default:
            return state;
    } 
}

export default productReducer;