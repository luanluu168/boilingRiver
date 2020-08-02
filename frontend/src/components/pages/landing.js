import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return (
            <div className="landing">
                <h1 className="d-inline-block">Welcome to <p className="d-inline rainbow-text">BuyKaCloth</p></h1>
                <h2 className="mt-2">A place to shop beautiful clothing</h2>
                <Link className="btn btn-primary mt-3 rounded-pill btn-responsive-lg" to="/">Goto Home</Link>
            </div>
        );
    }
}

export default Landing;