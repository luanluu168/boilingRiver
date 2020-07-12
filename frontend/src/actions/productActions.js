import {SELECT_PRODUCT, FETCH_PRODUCT, REQUEST_PRODUCT, ERROR_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, SEARCH_PRODUCT} from '../actionTypes/index.js';

const selectProduct = (product) => {
    console.log(`You click on a product: ${product.name}`);

    return ({
        type: SELECT_PRODUCT,
        payload: product
    });
}

const fetchProduct = (products) => {
    return ({
        type: FETCH_PRODUCT,
        payload: products
    });
} 

const requestProduct = (products) => {
    return ({
        type: REQUEST_PRODUCT,
        payload: products
    });
} 

const errorProduct = (products) => {
    return ({
        type: ERROR_PRODUCT,
        payload: products
    });
}

const deleteProduct = (productId) => {
    return ({
        type: DELETE_PRODUCT,
        payload: productId
    })
}

const addProduct = (product) => {
    return ({
        type: ADD_PRODUCT,
        payload: product
    })
}

const updateProduct = (product) => {
    return ({
        type: UPDATE_PRODUCT,
        payload: product
    })
}

const searchProduct = (name) => {
    return ({
        type: SEARCH_PRODUCT,
        payload: name
    })
}

export {selectProduct, fetchProduct, requestProduct, errorProduct, deleteProduct, addProduct, updateProduct, searchProduct};