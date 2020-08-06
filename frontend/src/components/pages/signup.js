import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PasswordStatusField from '../passwordStatusField/passwordStatusField';

class Signup extends React.Component {
    state = {
        signupError: undefined
    }

    handleSignup = async (event) => {
        event.preventDefault();

        const     USER_NAME = window.$("input[name=userSignupName]").val();
        const      USER_AGE = window.$("input[name=userSignupAge]").val();
        const  USER_COUNTRY = window.$("input[name=userSignupCountry]").val();
        const     USER_CITY = window.$("input[name=userSignupCity]").val();
        const    USER_EMAIL = window.$("input[name=userSignupEmail]").val();
        const USER_PASSWORD = window.$("input[name=userSignupPassword]").val();

        let route = `/Auth/Signup/${USER_NAME}&${USER_AGE}&${USER_COUNTRY}&${USER_CITY}&${USER_EMAIL}&${USER_PASSWORD}`;
        await axios.post(route)
                .then(response => { 
                    this.setState({signupError: response.data}); 
                    return response.data })
                .then(response => (response.errMsg === "none") ? (window.location.href = "/Signin") : "")
                .catch(error => console.log("Error: ", error));
    }

    render() {
        return (
            <div className="container pt-3">
                <div className="d-flex justify-content-center mb-3">
                    <img src={`/media/logo.png`} alt="LogoImg" />
                </div>
                
                { this.state.signupError && this.state.signupError.errMsg.detail !== "none" && <div className="alert alert-success text-center mt-3"><strong>{this.state.signupError.errMsg.detail}</strong></div> }

                <div className="d-flex justify-content-center">
                <div className="card">
                    <div className="card-header bg-secondary">
                    <h3 className="text-center text-white">Sign up</h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={(event) => this.handleSignup(event)}>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user" /></span>
                        </div>
                        <input type="text" className="form-control" name="userSignupName" placeholder="Enter your full name" required />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-file-image" /></span>
                        </div>
                        <input type="number" className="form-control" name="userSignupAge" id="userSignupAge" placeholder="Enter your age" />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-globe-americas" /></span>
                        </div>
                        <input type="text" className="form-control" name="userSignupCountry" placeholder="Enter your country" required />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-flag" /></span>
                        </div>
                        <input type="text" className="form-control" name="userSignupCity" placeholder="Enter city" required />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-envelope" /></span>
                        </div>
                        <input type="email" className="form-control" name="userSignupEmail" placeholder="Enter your email" required />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key" /></span>
                            <PasswordStatusField name="userSignupPassword" />
                        </div>
                        {/* <input type="password" className="form-control" name="userSignupPassword" placeholder="Password" required /> */}
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="termCheckBox" required />
                        <label className="custom-control-label" htmlFor="termCheckBox">I accept the <a href="# " type="button" data-toggle="modal" data-target="#contractModal"> Terms and Conditions</a></label>
                        </div>
                        <div className="form-group row justify-content-center">
                        <input type="submit" value="Sign-up Now" className="btn btn-primary rounded-pill w-75" />
                        </div>
                        <p className="cross-middle-line-text">Or</p>
                        <div className="text-center mb-3">
                            <Link to={`/`}>Home</Link>
                        </div> 
                        <p className="cross-middle-line-text">Already have an account?</p>
                        <div className="text-center">
                            <Link to={`/Signin`}>Sign-in</Link>
                        </div> 
                    </form>
                    </div>
                </div>

                <div className="modal fade bd-example-modal-xl" id="contractModal" tabIndex={-1} role="dialog" aria-labelledby="contactModal" aria-hidden="true">
                    <div className="modal-dialog  modal-dialog-scrollable modal-xl modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h5 className="modal-title">Terms And Conditions</h5><button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                        <div className="modal-body">
                            <h3>AGREEMENT TO TERMS</h3>
                            <p>These Terms of Use constitute a legally binding agreement made between you and BoilingRiver </p>
                            <p>By accessing the website, you must agree that you have read, understood, and agree to all of these Terms of Use. </p>
                            <p>We will alert you about any changes of these Terms of Use. However, it is your responsibility to periodically review and check the update of these Terms of Use.</p>
                            <h5>PRODUCTS</h5>
                            <p>All products are subject to availability. We reserve the right to discontinue or sale any products at any time for any reason. Prices for all products are subject to change.</p>
                            <h5>COOKIES</h5>
                            <p>This site uses cookies to make sure everything perform as expected for users. By continuing to use this site, you consent to our site of cookies.</p>
                            <h5>PRIVACY POLICY</h5>
                            <p>We care about data privacy and security. By using the website, you must agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Also, please notice that
                            the wedsite is hosted in the United States. </p>
                        </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        );
    }
}

export default Signup;