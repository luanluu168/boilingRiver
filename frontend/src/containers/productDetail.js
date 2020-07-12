import React from 'react';
import {selectProductDetail, fetchProductDetail, requestProductDetail, errorProductDetail, addToCart} from "../actions/index.js";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Rating from '../components/rating/rating.js';

class ProductDetail extends React.Component {
    componentDidMount() {
        this.fetchOneProductData().then(product => {
            this.props.fetchProductDetail(product);
        });
    }

    fetchOneProductData = async () => {
        this.props.requestProductDetail();
        let route = "/Products/" + this.props.pId;
        return (await axios.get(route)
                    .then(response => response.data[0])
                    .catch(error => console.log(error)));
    }

    handleCart = () => {
        this.props.addToCart(this.props.product);
    }

    render() {
        const TOTAL_SIZE = this.props.product.quantity || 0;
        return (
            this.props.loading === undefined ? <div>Loading...</div> :  this.props.loading === false && 
            <div className="container text-center">
                <div className="row d-flex justify-content-center">
                    <div className="mt-3 col" onClick={() => this.props.selectProductDetail(this.props.product)}>
                        <img src={`/media/${this.props.product.img_name}`} alt="productImg" />
                    </div>
                    <div className="mt-3 col-lg-3">
                    <div> 
                        <h4>{this.props.product.name}</h4>
                        <p>{this.props.product.description}</p>
                        <b>Price: ${this.props.product.price}</b> 
                        <div className="mt-3">
                            <Rating value={5}></Rating>
                        </div>
                    </div>

                    </div>
                    <div className="mt-3 col-lg-4">
                    <div className="border border-secondary"> 
                        <h5>Total: ${this.props.product.price}</h5>
                        <h5>Status: {TOTAL_SIZE === 0 ?  "Out of order" : "In stock"}</h5>
                        <div className="d-flex align-items-center justify-content-center"><h5>Quantity:</h5>
                                <select className="w-25 custom-select text-primary">
                                    {/* { TOTAL_SIZE === 0 ? (<option key={0} value={0}>{0}</option>) : _.range(1, TOTAL_SIZE + 1).map(value => <option key={value} value={value}>{value}</option>) } */}
                                    { TOTAL_SIZE === 0 ? (<option key={0} value={0}>{0}</option>) : _.range(1, 2).map(value => <option key={value} value={value}>{value}</option>) }
                                </select>
                        </div>
                        <div>
                            <button className="btn btn-primary rounded-pill w-75 mt-3 mb-3" onClick={() => this.handleCart()} disabled={TOTAL_SIZE === 0}>Add item to Cart</button>
                        </div> 
                        <p className="cross-middle-line-text">Or</p>
                        <div>
                            <Link to={`/Cart`}><button className="btn btn-primary rounded-pill w-75 mb-4">Goto Your Cart</button></Link>
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
        loading: state.productDetail.loading,
        product: state.productDetail.product,
        cart: state.cart.cart
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       selectProductDetail: selectProductDetail,
       requestProductDetail: requestProductDetail,
       fetchProductDetail: fetchProductDetail,
       errorProductDetail: errorProductDetail,
       addToCart: addToCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);