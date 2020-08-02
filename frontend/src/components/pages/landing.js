import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return (
            <div className="landing">
                <h1>Welcome to BuyKaCloth</h1>
                <h2 className="mt-2">A place to shop beautiful cloth</h2>
                <Link className="btn btn-primary mt-3 rounded-pill btn-responsive-lg" to="/">Goto Home</Link>
            </div>
        );
    }
}

export default Landing;