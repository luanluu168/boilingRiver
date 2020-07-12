import React from 'react';
import { Link } from 'react-router-dom';

class Signin extends React.Component {
    render() {
        return (
            <div className="container pt-3">
                <div className="d-flex justify-content-center mb-3">
                    <img src={`/media/logo.png`} alt="LogoImg" />
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card">
                    <div className="card-header bg-secondary">
                        <h3 className="text-center text-white">Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form action="/Auth/Signin" method="POST">
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user" /></span>
                            </div>
                            <input type="text" className="form-control" name="userEmail" placeholder="Enter your email" />
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key" /></span>
                            </div>
                            <input type="password" className="form-control" name="userPassword" placeholder="Password" />
                        </div>
                        <div className="form-group row justify-content-center">
                            <input type="submit" defaultValue="Sign-in" className="btn btn-primary rounded-pill w-75"/>
                        </div>
                        <p className="cross-middle-line-text">Or</p>
                        <div className="text-center">
                            <Link to={`/`}>Home</Link>
                        </div> 
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;