import { REAL_TIME_SEARCH, REGULAR_SEARCH, CLEAR_ICON_ON, CLEAR_ICON_OFF } from "../actionTypes";

const searchReducer = (state={searchProducts: [], displayClearIcon: false}, action) => {
    switch(action.type) {
        case REAL_TIME_SEARCH:
            return ({
                searchProducts: action.payload
            });
        case REGULAR_SEARCH:
            return ({
                searchProducts: action.payload
            })
        case CLEAR_ICON_ON:
            return ({
                displayClearIcon: action.payload
            })
        case CLEAR_ICON_OFF:
            return ({
                displayClearIcon: action.payload
            })
        default:
            return state;
    }
}

export default searchReducer;