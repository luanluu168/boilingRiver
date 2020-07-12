import { USER_SIGNIN_REQUEST, USER_SIGNOUT } from "../actionTypes";

const userSigninRequest = (email, password) => {
    return ({
        type: USER_SIGNIN_REQUEST,
        payload: {email, password}
    });
}

const userSignout = () => {
    return ({
        type: USER_SIGNOUT,
        payload: {}
    });
}

export { userSigninRequest, userSignout };