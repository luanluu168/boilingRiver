import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import productDetailReducer from './productDetailReducer.js';
import searchReducer from './searchReducer.js';
import cartReducer from './cartReducer.js';
import orderReducer from './orderReducer.js';
import { userSigninReducer } from './userReducer.js';
import receiptReducer from './receiptReducer.js';

const reducers = combineReducers({
    products: productReducer,
    productDetail: productDetailReducer,
    search: searchReducer,
    cart: cartReducer,
    orders: orderReducer,
    user: userSigninReducer,
    receipt: receiptReducer
});

export default reducers;