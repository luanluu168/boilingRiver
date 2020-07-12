import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { requestReceipt, fetchReceipt } from '../../actions';
import CheckoutSteps from '../checkoutSteps/checkoutSteps';

class Receipt extends React.Component {
    componentDidMount() {
        this.fetchData().then(receipt => {
            this.props.fetchReceipt(receipt);
        });
    }

    async fetchData() {
        let route1 = "/Receipt/" + this.props.oId + "&pt=" + this.props.pt;
        let route2 = "/Receipt/" + this.props.oId;
        this.props.requestReceipt();
        if(this.props.pt) {
            return (await axios.post(route1).then(response => {
                return axios.get(route2).then(res => res.data[0]).catch(err => err)
            }).catch(error => console.log(error)));
        } else {
            return (await axios.get(route2).then(response => 
                    response.data[0]
                ).catch(error => console.log(error)));
        }
    }

    reformatDate(str) {
        str += "";
        let newStr = "";
        const REMOVE_CHAR_LENGTH = 5;
        for (var i = 0; i < str.length - REMOVE_CHAR_LENGTH; i++) {
          if(str.charAt(i) !== 'T') {
            newStr += str.charAt(i);
          } else if(str.charAt(i) === 'T') {
            newStr += " ";
          } 
        }
        return newStr;
    }

    render() {
        let {receipt} = this.props;
        return ( (this.props.loading === undefined || this.props.loading === true) ? (<div>Loading...</div>) : (this.props.loading === false && receipt !== undefined &&
            (<div className="row justify-content-center align-items-center mt-3">
                <div className="col-auto">
                    <div className="d-flex justify-content-center">
                        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                    </div>
                    <table className="table table-responsive text-center table-light">
                    <tbody><tr>
                        <td className="content-block"><h3>This is your purchasing receipt</h3></td>
                        </tr>
                        <tr>
                        <td className="content-block">
                            <table className="invoice m-auto">
                            <tbody><tr>
                                <td>Payment Id:</td>
                                <td className="alignright">{receipt.id}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Payment Date:</td>
                                <td className="alignright">{this.reformatDate(receipt.payment_date)}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Payment Amount:</td>
                                <td className="alignright">$ {receipt.amount}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Order Date:</td>
                                <td className="alignright">{this.reformatDate(receipt.order_date)}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Delivered Date:</td>
                                <td className="alignright">{this.reformatDate(receipt.delivered_date)}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Order Total:</td>
                                <td className="alignright">$ {receipt.total}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Order Status:</td>
                                <td className="alignright">{receipt.status}</td>
                                </tr><tr>
                                </tr><tr>
                                <td>Payment Method:</td>
                                <td className="alignright">{receipt.name}</td>
                                </tr><tr>
                                </tr></tbody></table>
                        </td>
                        </tr>
                        <tr>
                        <td className="content-block"><p>Thanks for shopping at BuyKaCloth</p></td>
                        </tr>
                        <tr>
                        <td><p className="text-center"> Have a great day ! </p></td>
                        </tr>
                    </tbody></table>
                    <p className="text-center"><a href="/orders/"> Go back to order to write the product review ?</a></p>
                </div>
            </div>))
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loading: state.receipt.loading,
        receipt: state.receipt.receipt
    })
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestReceipt: requestReceipt,
        fetchReceipt: fetchReceipt
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);