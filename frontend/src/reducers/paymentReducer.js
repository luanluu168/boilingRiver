const paymentReducer = (state={payment: ''}, action) => {
    switch(action.type) {
        case ADD_PAYMENT:
            return ({
                payment: action.payload
            });
        default:
            return state;
    }
}

export default paymentReducer;