import React from 'react';

function SubmitButton(props) {
    return (
        <button className="btn btn-checkout-color rounded-pill w-75 mt-3" type="submit" disabled={!props.stripe}>
            Pay ${props.total} <i className="fa fa-lock" aria-hidden="true"></i>
        </button>
    )
}

export default SubmitButton;