import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { addOrder } from '../actions/orderActions';
import axios from 'axios';

import Cookie from 'js-cookie';
import { deleteCartItem, changeCartItemQuantity, addToCart, fetchCookieItemToCart } from '../actions';
import CheckoutSteps from '../components/checkoutSteps/checkoutSteps';

class Cart extends React.Component {
    gotoOrder = async (event) => {
        let route = '/orders/aId=' + (Cookie.getJSON('userLoginInfo') ? Cookie.getJSON('userLoginInfo').aId : '-1') + '&array=' + JSON.stringify(this.props.cart.map(c => c.id));
        await axios.post(route).then(response => {
            console.log("data: " + response.data);
        }).catch(error => console.log(error));
        // maynot be called
        // this.props.addOrder(this.props.cart);
    }

    handleQuantityChange(event) {
        console.log("quantity is changed: " + event.target.value + ", key: " + event.target.id);
    }
    
    render() {
        let route = '/orders/aId=' + (Cookie.getJSON('userLoginInfo') ? Cookie.getJSON('userLoginInfo').aId : '0') + '&array=' + JSON.stringify(this.props.cart.map(c => c.id));
        const {cart} = this.props;
        return (
            <div className="row mt-3">
                <div className="col">
                <ul className="list-group list-group-flush">
                    <li className="d-flex justify-content-center">
                        { Cookie.getJSON('userLoginInfo') ? <CheckoutSteps step1></CheckoutSteps> : <CheckoutSteps></CheckoutSteps> }
                    </li>
                    <li>
                        <h3>
                            Shopping Cart
                        </h3>
                        <h6 className="float-right mr-3">
                            Price
                        </h6>
                    </li>
                    {
                    cart.constructor === Array && cart.length === 0 ? <div className="alert alert-success text-center mt-3"><strong>Your cart is empty</strong></div> : 
                        cart.map(item =>
                            <li key={item.id} className="list-group-item list-group-item-info">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={`/media/${item.img_name}`} height="80" width="80" className="rounded-circle" alt="productImg" />
                                        <div>
                                            <Link to={"/products/" + item.id}> {item.name} </Link>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div>
                                            Qty:
                                                <select onChange={(event) => this.handleQuantityChange(event)}>
                                                    { _.range(1, 2).map(value => <option key={value} id={item.id} value={value}>{value}</option>) }
                                                </select>
                                                <button type="button" className="btn btn-danger rounded btn-sm ml-2" onClick={() => this.props.deleteCartItem(item)} > Delete </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="float-right">
                                            ${item.price}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
                </div>

                <div className="col-4">
                    <div className="mr-2 text-center border border-secondary">
                        <h5>
                            Subtotal ( {cart.reduce((a, c) => a + 1, 0)} items) : $ {cart.reduce((a, c) => a + c.price, 0)}
                        </h5>
                        {cart.reduce((a, c) => a + 1, 0) !== 0 && <h5>Shipping: Free </h5>}
                        {
                        cart.length === 0 ? 
                        <button className="btn btn-primary w-75 rounded-pill mb-2" disabled={cart.length === 0} onClick={(event) => this.gotoOrder(event)}> Proceed to Checkout </button> :
                        (<form className="w-100 m-0" action={route} method="POST">
                            <button className="btn btn-primary w-75 rounded-pill mb-2" disabled={cart.length === 0} onClick={(event) => this.gotoOrder(event)}> Proceed to Checkout </button>
                        </form>)
                       }
                    </div>
                </div>

            </div>
        );                
    }
}

const mapStateToProps = (state) => {
    return ({
        currentQuantity: state.cart.currentQuantity,
        cart: state.cart.cart,
        orders: state.orders.orders
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addOrder: addOrder,
        deleteCartItem: deleteCartItem,
        changeCartItemQuantity: changeCartItemQuantity,
        addToCart: addToCart,
        fetchCookieItemToCart: fetchCookieItemToCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

                     