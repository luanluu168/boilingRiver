import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div className="container pt-3">
                <div className="alert alert-success text-center mt-3"><strong>... Page Not Found</strong></div>
            </div>
        );
    }
}

export default Error;