import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index.js';

const initialState = {products: []};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;