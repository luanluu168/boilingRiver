import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PasswordStatusField from '../passwordStatusField/passwordStatusField';

class Signin extends React.Component {
    state = {
        signinMessage: undefined
    }

    handleSignin = async (event) => {
        event.preventDefault();
        const USER_EMAIL = window.$("input[name=userEmail]").val();
        const USER_PASSWORD = window.$("input[name=userPassword]").val();
        let route = `/Auth/Signin/${USER_EMAIL}&${USER_PASSWORD}`;
        await axios.post(route)
                .then(response => { 
                    this.setState({signinError: response.data}); 
                    return response.data })
                .then(response => (response.errMsg === "none") ? (window.location.href = "/") : "")
                .catch(error => console.log("Error: ", error));
    }

    render() {
        return (
            <div className="container pt-3">
                <div className="d-flex justify-content-center mb-3">
                    <img src={`/media/logo.png`} alt="LogoImg" />
                </div>

                {this.state.signinError && this.state.signinError.errMsg !== "none" && <div className="alert alert-success text-center mt-3"><strong>{this.state.signinError.errMsg}</strong></div>}

                <div className="d-flex justify-content-center">
                    <div className="card">
                    <div className="card-header bg-secondary">
                        <h3 className="text-center text-white">Sign In</h3>
                    </div>
                    <div className="card-body">
                    <form name="signinForm" onSubmit={(event) => this.handleSignin(event)}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user" /></span>
                            </div>
                            <input type="email" className="form-control" name="userEmail" placeholder="Enter your email" required/>
                        </div>
                        
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key" /></span>
                            <PasswordStatusField name="userPassword"/>
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <input type="submit" value="Sign-in" className="btn btn-primary rounded-pill w-75"/>
                        </div>
                        <p className="cross-middle-line-text">Or</p>
                        <div className="text-center mb-3">
                            <Link to={`/`}>Home</Link>
                        </div> 
                        <p className="cross-middle-line-text">Do not have an account yet?</p>
                        <div className="text-center">
                            <Link to={`/Signup`}>Sign-up</Link>
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