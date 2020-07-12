import axios from 'axios';
import { FETCH_PRODUCT } from "../actionTypes";

const realtimeSearch = (text) => async (dispatch, getState) => {
    let route = "/search/realtime/" + text;
    return (await axios.get(route).then(response => {
                dispatch({
                    type: FETCH_PRODUCT,
                    payload: response.data
                });
            }).catch(error => console.log(error)));
}

const regularSearch = (text) => async (dispatch, getState) => {
    let route = "/search/searchText=" + text;
    if(text.length === 0) {
        return {};
    }

    return (await axios.get(route).then(response => {
                dispatch({
                    type: FETCH_PRODUCT,
                    payload: response.data
                });
            }).catch(error => console.log(error)));
}

export { realtimeSearch, regularSearch };