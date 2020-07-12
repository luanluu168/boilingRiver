import React from 'react';

class CheckoutSteps extends React.Component {
    render() {
        return (
            <div className="mt-2">
                <div>
                    <div className="orange-text text-center"><ins><i className="fa fa-shopping-cart" aria-hidden="true"></i>Checkout Steps</ins></div>
                </div>
                <div className="d-flex align-items-center justify-content-sm-between mt-4 mb-4">
                    <div className={this.props.step1 ? 'orange-text ml-1' : 'ml-1'}> {this.props.step1 && <i className="fa fa-check-circle" aria-hidden="true"></i>} Sign-in &#8674; </div>
                    <div className={this.props.step2 ? 'orange-text ml-1' : 'ml-1'}> {this.props.step2 && <i className="fa fa-check-circle" aria-hidden="true"></i>} Cart &#8674; </div>
                    <div className={this.props.step3 ? 'orange-text ml-1' : 'ml-1'}> {this.props.step3 && <i className="fa fa-check-circle" aria-hidden="true"></i>} Payment &#8674; </div>
                    <div className={this.props.step4 ? 'orange-text ml-1' : 'ml-1'}> {this.props.step4 && <i className="fa fa-check-circle" aria-hidden="true"></i>} Receipt </div>
                </div>
            </div>
        );
    }
}

export default CheckoutSteps;