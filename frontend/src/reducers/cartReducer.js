import { ADD_TO_CART, DELETE_CART_ITEM, CHANGE_CART_ITEM_QUANTITY, FETCH_COOKIE_ITEMS_TO_CART, RESET_COOKIE_AND_CART } from "../actionTypes";
import Cookie from 'js-cookie';

const cartReducer = (state={cart: [], currentQuantity: []}, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            let isFound = state.cart.find(element => element.id === action.payload.id);
            const newCart = isFound ? state.cart : [...state.cart, action.payload];
            const newQuantity = isFound ? state.currentQuantity : [...state.currentQuantity, 1];
            Cookie.set('cartInfo', newCart, {expires: 20});
            return ({
                currentQuantity: newQuantity,
                cart: newCart
            });
        case DELETE_CART_ITEM:
            let removedQtyIndex = state.cart.indexOf(action.payload.id);
            const afterDeleteCart = state.cart.filter(element => element !== action.payload)
            Cookie.set('cartInfo', afterDeleteCart, { expires: 20});
            return ({
                currentQuantity: state.currentQuantity.filter((element, index) => index !== removedQtyIndex),
                cart: afterDeleteCart
            })
        case CHANGE_CART_ITEM_QUANTITY:
            // console.log("Change cart item quanity is called: action.payload.currentQuantity= " + action.payload.currentQuantity);
            return ({
                currentQuantity: action.payload.currentQuantity,
                cart: state.cart
            })
        case FETCH_COOKIE_ITEMS_TO_CART:
            return ({
                currentQuantity: state.currentQuantity,
                cart: action.payload
            })
        case RESET_COOKIE_AND_CART:
            Cookie.set('cartInfo', action.payload, { expires: 20});
            return ({
                currentQuantity: [],
                cart: action.payload
            })
        default:
            return state;
    }
}

export default cartReducer;