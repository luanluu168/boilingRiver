import { REAL_TIME_SEARCH, REGULAR_SEARCH } from "../actionTypes";

const searchReducer = (state={searchProducts: []}, action) => {
    switch(action.type) {
        case REAL_TIME_SEARCH:
            return ({
                searchProducts: action.payload
            });
        case REGULAR_SEARCH:
            return ({
                searchProducts: action.payload
            })
        default:
            return state;
    }
}

export default searchReducer;