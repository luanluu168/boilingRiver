import React from 'react';
import {selectProduct, fetchProduct, requestProduct, errorProduct} from "../actions/index.js";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isSearch: false,
          searchText: ''
        };
      }
      
    async componentDidMount() {
        await this.getProductData()
                    .then(products => {
                                        // console.log("_________" + JSON.stringify(products));
                                        this.props.fetchProduct(products);
                                        });
    }

    async getProductData() {
        this.props.requestProduct();
        let route = this.state.isSearch ? `/search/?searchText=:${this.state.searchText}` : `/api`;
        return (await axios.get(route)
                          .then((response) => {
                            //   console.log("!!!!!!!!!!!!!!!!" + JSON.stringify(response));
                            return response.data;
                          })
                          .catch((error) => {
                            console.log(error);
                          })
        );
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max) + 2);
    }

    render() {
        return (
            this.props.loading === undefined || !this.props.products ? <div>Loading... if waiting too long, please refesh the page</div> : 
            <div className="container text-center">
                <div className="row d-flex justify-content-center">
                    {this.props.products.map((eachProduct, index) => (
                        <div key={eachProduct.id} className="m-3 col-lg-3 border border-secondary" onClick={() => this.props.selectProduct(eachProduct)}>
                        <div className="m-3">
                            <img src={`/media/${eachProduct.img_name}`} height="150" width="150" className="rounded-circle" alt="productImg" />
                        </div>
                        <h5>{eachProduct.name}</h5>
                        <p>{eachProduct.description}</p>
                        <b>${eachProduct.price}</b>
                        <p className="mt-2">
                            <Link to={`/Products/${eachProduct.id}`} className="d-flex justify-content-center btn btn-outline-primary rounded-pill" product={eachProduct}>Details</Link>
                        </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("__________state:" + JSON.stringify(state.products));
    return {
        loading: state.products.loading,
        products: state.products.products
    }
}
const mapDispatchToProps = (dispatch) => {
    // console.log("____________dispatch: " + dispatch);
    return bindActionCreators({
        selectProduct: selectProduct,
        fetchProduct: fetchProduct,
        requestProduct: requestProduct,
        errorProduct: errorProduct
    }, dispatch);
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductContainer;