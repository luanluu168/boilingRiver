import axios from 'axios';
import { FETCH_PRODUCT, CLEAR_ICON_ON, CLEAR_ICON_OFF } from "../actionTypes";

const realtimeSearch = (text) => async (dispatch, getState) => {
    let updateText = text.replace(/\\/g, '');
    updateText     = updateText.replace(/\//g, '');
    let      route = "/search/realtime/" + updateText;
    if(updateText.length === 0 ) {
        dispatch({
            type: CLEAR_ICON_OFF,
            payload: false
        });
    } else {
        dispatch({
            type: CLEAR_ICON_ON,
            payload: true
        });
    }

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

const clearIconOn = (text) => async (dispatch, getState) => {
    dispatch({
        type: CLEAR_ICON_ON,
        payload: text
    });
}

const clearIconOff = (text) => async (dispatch, getState) => {
    dispatch({
        type: CLEAR_ICON_OFF,
        payload: text
    });
    
    let route = "/search/realtime/";
    await axios.get(route).then(response => {
        dispatch({
            type: FETCH_PRODUCT,
            payload: response.data
        });
    }).catch(error => console.log(error));
}

export { realtimeSearch, regularSearch, clearIconOn, clearIconOff };