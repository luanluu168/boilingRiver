import React from 'react';
import {Link} from 'react-router-dom';
import SelectProduct from "../../actions/index.js";
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';

class Product extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row d-flex justify-content-center">
                    {this.props.products && this.props.products.map((eachProduct, index) => (
                        <div key={index} className="m-3 col-lg-3 border border-secondary">
                        <div className="m-3">
                            <img src="/media/sample.jpg" height="150" width="150" className="rounded-circle" alt="productImg" />
                        </div>
                        <h5>{eachProduct.name}</h5>
                        <p>{eachProduct.description}</p>
                        <b>${eachProduct.price}</b>
                        <p className="mt-2">
                            <Link to={`/Products/${index}`} className="d-flex justify-content-center btn btn-outline-primary rounded-pill" product={eachProduct}>Details</Link>
                        </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectProduct: SelectProduct
    }, dispatch);
}

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product);

export default ProductContainer;