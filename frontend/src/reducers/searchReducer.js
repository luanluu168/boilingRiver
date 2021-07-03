import { REAL_TIME_SEARCH, REGULAR_SEARCH, CLEAR_ICON_ON, CLEAR_ICON_OFF, AUTOCOMPLETE_OFF, AUTOCOMPLETE_ON } from "../actionTypes";

const searchReducer = (state = {
    searchProducts: [],
    availableOptions: [],
    isAutocompleteOn: false,
    displayClearIcon: false
}, action) => {

    switch(action.type) {
        case REAL_TIME_SEARCH:
            const hashMap = {};
            const options = [];
            action.payload.data.forEach((item) => {
                if(!hashMap[item.name]) {
                    options.push(item.name);
                }
                hashMap[item.name] = true;
            });

            return ({
                availableOptions: options,
                isAutocompleteOn: state.isAutocompleteOn,
                displayClearIcon: action.payload.input.length > 0
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
        case AUTOCOMPLETE_ON:
            return ({
                isAutocompleteOn: true
            })
        case AUTOCOMPLETE_OFF:
            return ({
                isAutocompleteOn: false
            })
        default:
            return state;
    }
}

export default searchReducer;