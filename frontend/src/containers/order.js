import React from 'react';
import {fetchOrders} from "../actions/index.js";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {connect} from 'react-redux';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

class Order extends React.Component {
    componentDidMount() {
        this.fetchData().then(orders => {
            this.props.fetchOrders(orders);
        });
    }

    fetchData = async () => {
        // this.props.requestOrdersData();
        let route = "/orders/fetchCustomerOrder=" + (Cookie.getJSON("userLoginInfo") !== undefined ? Cookie.getJSON("userLoginInfo").aId : "''");
        return (await axios.get(route)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => console.log(error)));
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

        return (
            this.props.loading === undefined ? (<div>Loading...</div>) : (this.props.loading === false && this.props.orders.constructor !== Array) ?
            (<div><h3>Order</h3><div className="alert alert-success text-center mt-3"><strong>Your Order is empty now</strong></div></div>) : (this.props.loading === false &&
                <div className="table-responsive mt-3">
                    <table className="table table-striped table-inverse">
                        <thead className="thead-inverse text-center">
                            <tr className="table-font-size">
                                <th>ID</th>
                                <th>Order date</th>
                                <th>Delivered Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Checkout</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody className="text-center table-font-size">
                            {
                                this.props.orders.constructor === Array && 
                                this.props.orders.map((eachOrder, index) => (
                                    eachOrder.status === 'draft' ?
                                        (<tr key={eachOrder.id}>
                                            <td>{eachOrder.id}</td>
                                            <td>{this.reformatDate(eachOrder.order_date)}</td>
                                            <td>{this.reformatDate(eachOrder.delivered_date)}</td>
                                            <td>{eachOrder.total}</td>
                                            <td>{eachOrder.status}</td>
                                            <td><a href={`/Payment/oId=${eachOrder.id}`}>Process to checkout</a> </td>
                                            <td>-</td>
                                        </tr>) :
                                    eachOrder.status === 'paid' ?
                                        (<tr key={eachOrder.id}>
                                            <td>{eachOrder.id}</td>
                                            <td>{this.reformatDate(eachOrder.order_date)}</td>
                                            <td>{this.reformatDate(eachOrder.delivered_date)}</td>
                                            <td>{eachOrder.total}</td>
                                            <td>{eachOrder.status}</td>
                                            <td><Link to={`/Receipt/${eachOrder.id}`}>See receipt</Link></td>
                                            <td><Link to={`/review/orderId=${eachOrder.id}`}>Write a review</Link></td>
                                        </tr>) :
                                    (<div>You don't have an order yet</div>) 
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loading: state.orders.loading,
        orders: state.orders.orders
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchOrders: fetchOrders
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);