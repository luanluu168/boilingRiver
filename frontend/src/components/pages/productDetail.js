import React from 'react';

class ProductDetail extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row d-flex justify-content-center">
                    <div className="m-3 col">
                        <img src="/media/sample.jpg" alt="productImg" />
                    </div>
                    <div className="m-3 col-lg-3">
                    {
                    this.props.product && 
                    <div> 
                        <h5>{this.props.product.name}</h5>
                        <p>{this.props.product.description}</p>
                        <b>Price: ${this.props.product.price}</b> 
                    </div>
                    }
                    </div>
                    <div className="m-3 col-lg-3">
                    {
                    <div className="border border-info"> 
                        <h5>Total: ${this.props.product.price}</h5>
                        <p>Status: {this.props.product.description}</p>
                        <b>Qty: 
                            <select className="w-25">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </b> 
                        <button className="btn btn-primary rounded-pill mt-3 mb-2">Continue checkout</button>
                    </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;