import {SELECT_PRODUCT_DETAIL, FETCH_PRODUCT_DETAIL, REQUEST_PRODUCT_DETAIL, ERROR_PRODUCT_DETAIL} from '../actionTypes/index.js';

const selectProductDetail = (product) => {
    console.log(`You click on a productDetail: ${product.name} - ${product.id}`);

    return ({
        type: SELECT_PRODUCT_DETAIL,
        payload: product
    });
}

const fetchProductDetail = (product) => {
    return ({
        type: FETCH_PRODUCT_DETAIL,
        payload: product
    });
} 

const requestProductDetail = (product) => {
    return ({
        type: REQUEST_PRODUCT_DETAIL,
        payload: product
    });
} 

const errorProductDetail = (product) => {
    return ({
        type: ERROR_PRODUCT_DETAIL,
        payload: product
    });
} 

export {selectProductDetail, fetchProductDetail, requestProductDetail, errorProductDetail};