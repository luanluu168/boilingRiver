import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    render() {
        return (
            <div className="container pt-3">
                <div className="d-flex justify-content-center mb-3">
                    <img src={`/media/logo.png`} alt="LogoImg" />
                </div>
                
                <div className="d-flex justify-content-center">
                <div className="card">
                    <div className="card-header bg-secondary">
                    <h3 className="text-center text-white">Sign up</h3>
                    </div>
                    <div className="card-body">
                    <form action="/Auth/Signup" method="POST">
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
                        <input type="text" className="form-control" name="userSignupAge" placeholder="Enter your age" />
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
                        <input type="text" className="form-control" name="userSignupEmail" placeholder="Enter your email" required />
                        </div>
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key" /></span>
                        </div>
                        <input type="password" className="form-control" name="userSignupPassword" placeholder="Password" required />
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="termCheckBox" required />
                        <label className="custom-control-label" htmlFor="termCheckBox">I accept the <a className="a-href text-info" href="# " type="button" data-toggle="modal" data-target="#contractModal"> Terms and Conditions</a></label>
                        </div>
                        <div className="form-group row justify-content-center">
                        <input type="submit" defaultValue="Sign-up" className="btn btn-primary rounded-pill w-75" />
                        </div>
                        <p className="cross-middle-line-text">Or</p>
                        <div className="text-center">
                            <Link to={`/`}>Home</Link>
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
                            <p>These Terms of Use constitute a legally binding agreement made between you and BuyKaCloth, concerning your access to and the use of the BuyKaCloth website as well
                            as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected there to (collectively, the “Site”). </p>
                            <p>You must agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. </p>
                            <p>We will alert you about any changes of these Terms of Use, but you can waive any right to receive specific notice of each such change. However, it is your responsibility to periodically review these Terms of Use
                            to stay informed of updates.</p>
                            <h5>PRODUCTS</h5>
                            <p>All products are subject to availability. We reserve the right to discontinue or sale any products at any time for any reason. Prices for all products are subject to change.</p>
                            <h5>PRIVACY POLICY</h5>
                            <p>We care about data privacy and security. By using the Site, you must agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Also, please notice that
                            the Site is hosted in the United States. </p>
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