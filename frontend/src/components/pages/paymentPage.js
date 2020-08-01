import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Cookie from 'js-cookie';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../payment/checkoutForm';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../checkoutSteps/checkoutSteps';

//TODO: FIX DOTENV STRIPE KEY
require('dotenv').config();
// require('dotenv').config({path: '../../../../env'});
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

class Payment extends React.Component {
  state = {
    order: {},
    paymentType: 1,
    stripePromise: null
  }
  
  componentDidMount = async () => {
    this.setState({stripePromise: stripePromise});
    let route = "/orders/getOId=" + this.props.query.oId;
    await axios.get(route).then(response => this.setState({order: response.data})).catch(error => console.log(error));
  }

  reformatDate(str) {
    str += "";
    let newStr = "";
    const REMOVE_CHAR_LENGTH = 5;
    for (let i = 0; i < str.length - REMOVE_CHAR_LENGTH; i++) {
      if(str.charAt(i) !== 'T') {
        newStr += str.charAt(i);
      } else if(str.charAt(i) === 'T') {
        newStr += " ";
      } 
    }
    return newStr;
  }

  handleSelection(value) {
    this.setState({paymentType: value});
  }

  async handleDiscardOrder(id) {
    let route = "/orders/delete/orderId=" + id;
    await axios.post(route).then(response => response.data).catch(error => console.log(error));
  }

  render() {
    return (
        <div>
          <div className="row justify-content-center">
            <div className="col-md-4 order-md-4 mb-4">
              
                <div className="d-flex justify-content-center">
                  <CheckoutSteps step1 step2></CheckoutSteps>
                </div>
              
                
              <h4 className="text-center mb-3 mt-3"> Your Order Information </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed"><div>ID:</div><span>{this.props.query.oId}</span></li>
                <li className="list-group-item d-flex justify-content-between lh-condensed"><div>Name:</div><span>{Cookie.getJSON("userLoginInfo").name}</span></li>
                <li className="list-group-item d-flex justify-content-between lh-condensed"><div>Order date:</div><span>{this.reformatDate(this.state.order.order_date)}</span></li>
                <li className="list-group-item d-flex justify-content-between lh-condensed"><div>Delivered date:</div><span>{this.reformatDate(this.state.order.delivered_date)}</span></li>
                <ul>
                </ul></ul></div>
          </div>
          {/* <form action={`/receipt/${this.props.query.oId}`} method="POST"> */}
          <form >
            <div className="row justify-content-center">
              <h3 className="mb-3">Payment</h3>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 order-md-4 mb-4">
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed"><label htmlFor="paymentMethod">Choose a payment method:</label>
                    <span><select name="paymentType" onChange={(event) => this.handleSelection(event.target.value)}>
                        <option value={1}>Debit Card</option>
                        <option value={2}>Credit Card</option>
                        {/* <option value={3}>PayPal</option> */}
                      </select></span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row justify-content-center">
              <Link to={`/`}><button className="btn btn-danger btn-responsive-lg" name="deleteButton" type="submit" onClick={() => this.handleDiscardOrder(this.props.query.oId)}>Discard this order</button></Link>
              
              <a href="# " data-toggle="modal" data-target="#paymentModal"><button className="btn btn-primary ml-3 btn-responsive-lg" name="paymentButton" type="submit">Continue to checkout</button></a>
            </div>
          </form>

          

          <div className="modal fade bd-example-modal-md" id="paymentModal" tabIndex={-1} role="dialog" aria-labelledby="paymentModal" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-body">
                    <Elements stripe={this.state.stripePromise}>
                      <CheckoutForm oId={this.props.query.oId} paymentType={this.state.paymentType} total={this.state.order.total}/>
                    </Elements>
                </div>
                </div>
              </div>
          </div>
      </div>
    ); 
  }
}

const mapStateToProps = (state) => {
  return ({
    orders: state.orders.orders
  })
}

export default connect(mapStateToProps)(Payment);



