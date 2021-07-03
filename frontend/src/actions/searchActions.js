import axios from 'axios';
import { 
    FETCH_PRODUCT,
    CLEAR_ICON_ON,
    CLEAR_ICON_OFF, 
    REAL_TIME_SEARCH,
    AUTOCOMPLETE_ON,
    AUTOCOMPLETE_OFF
} from "../actionTypes";

const realtimeSearch = (text) => async (dispatch, getState) => {
    let updateText = text.trim().replace(/\\/g, '');
    updateText = updateText.replace(/\//g, '');
    const route = "/search/realtime/" + updateText;
    
    if(updateText.match(/^(\s*)$/gi)) {
        dispatch(setAutocomplete(false));
    } else {
        dispatch(setAutocomplete(true));
    }

    return (await axios
                    .get(route)
                    .then(response => {
                        dispatch({
                            type: REAL_TIME_SEARCH,
                            payload: {
                                data: response.data,
                                input: updateText
                            }
                        });

                        dispatch({
                            type: FETCH_PRODUCT,
                            payload: response.data
                        });
                    })
                    .catch(error => console.log(error)));
}

const regularSearch = (text) => async (dispatch, getState) => {
    let route = "/search/searchText=" + text;
    if(text.length === 0) {
        return {};
    }

    return (await axios
                    .get(route)
                    .then(response => {
                        dispatch({
                            type: FETCH_PRODUCT,
                            payload: response.data
                        });
                    }).catch(error => console.log(error)));
}

const clearIconOn = () => async (dispatch, getState) => {
    dispatch({
        type: CLEAR_ICON_ON,
        payload: true
    });
}

const clearIconOff = () => async (dispatch, getState) => {
    dispatch({
        type: CLEAR_ICON_OFF,
        payload: false
    });
    
    let route = "/search/realtime/";
    await axios
            .get(route)
            .then(response => {
                dispatch({
                    type: FETCH_PRODUCT,
                    payload: response.data
                });
            }).catch(error => console.log(error));
}

const setAutocomplete = (status) => async (dispatch, getState) => {
    dispatch({
        type: status ? AUTOCOMPLETE_ON : AUTOCOMPLETE_OFF,
        payload: status
    });
} 

export { realtimeSearch, regularSearch, clearIconOn, clearIconOff, setAutocomplete };