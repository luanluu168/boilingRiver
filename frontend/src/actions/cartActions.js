import { ADD_TO_CART, DELETE_CART_ITEM, CHANGE_CART_ITEM_QUANTITY, FETCH_COOKIE_ITEMS_TO_CART, RESET_COOKIE_AND_CART } from "../actionTypes";

const addToCart = (product) => {
    return ({
        type: ADD_TO_CART,
        payload: product
    });
}

const deleteCartItem = (product) => {
    return ({
        type: DELETE_CART_ITEM,
        payload: product
    })
}

const changeCartItemQuantity = (quantity) => {
    return ({
        type: CHANGE_CART_ITEM_QUANTITY,
        payload: quantity
    })
}

const fetchCookieItemToCart = (cookieItems) => {
    return ({
        type: FETCH_COOKIE_ITEMS_TO_CART,
        payload: cookieItems
    })
}

const resetCookieAndCart = () => {
    return ({
        type: RESET_COOKIE_AND_CART,
        payload: []
    })
}

export { addToCart, deleteCartItem, changeCartItemQuantity, fetchCookieItemToCart, resetCookieAndCart };