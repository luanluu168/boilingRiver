import React from 'react';
import {selectProduct, fetchProduct, requestProduct, errorProduct, deleteProduct, addProduct, updateProduct, searchProduct } from "../../actions/index.js";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ManageProducts extends React.Component {
    state = {
        showInsertForm: false,
        showUpdateForm: false,
        categories: [],
        updateProductInfo: {}
    }

    changeInsertFormStatus() {
        this.setState({
            showInsertForm: !this.state.showInsertForm,
            showUpdateForm: false
        });
    }

    changeUpdateFormStatus() {
        this.setState({
            showInsertForm: false,
            showUpdateForm: !this.state.showUpdateForm
        });
    }

    componentDidMount() {
        this.fetchProductData().then(products => {
            this.props.fetchProduct(products);
        });
    }

    fetchProductData = async () => {
        this.props.requestProduct();
        let route = "/ManageProducts";
        return (await axios.get(route)
                    .then(response => response.data)
                    .catch(error => console.log(error)));
    }

    async deleteProduct(id) {
        let route = "/ManageProducts/delete/" + id;
        await axios.post(route).then(response => response.data.success === true && this.props.deleteProduct(id))
                                .catch(error => console.log(error));
    }

    async insertProduct(btnName) {
        let route = "/ManageProducts/categoryOptions";
        await axios.get(route).then(response => this.setState({categories: response.data}))
                                .catch(error => console.log(error));
        this.changeInsertFormStatus();
    }

    async updateProduct(id) { 
        let route = "/ManageProducts/updateProductInfo/" + id;
        await axios.get(route).then(response => {
                                    this.setState({updateProductInfo: response.data[0]});
                                })
                                .catch(error => console.log(error));
        this.changeUpdateFormStatus();
    }

    performSearch = async (value) => {
        let route = "/search/realtime/" + value;
        await axios.get(route).then(response => this.props.searchProduct(response.data)).catch(error => console.log(error));
    }

    render() {
        return (
            this.props.loading === undefined ? <div>Loading...</div> :
            this.props.loading === false &&
            (<div className="row justify-content-center mt-3">
                <div className="col-auto">
                    
                    {/* <div className='container-fluid'>
                        <form className="w-75 ml-auto mr-auto mt-3 mb-3" action="/search/?searchText=:" method="GET">
                            <div className="input-group md-form form-sm form-2 pl-0">
                                <input className="flex-grow-1 border border-info" type="text" name="searchText" onChange={(event) => this.performSearch(event.target.value)} placeholder="Search by typing in a keyword, for example: jacket, jean, or hoodie" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="submit"><i className="fas fa-2x fa-search text-primary" aria-hidden="true" /></button>
                                </div>
                            </div>
                        </form>
                    </div> */}

                    {this.state.showInsertForm && 
                    <div className="row justify-content-center mt-3 mb-4">
                        <div className="card">
                            <h5 className="card-header text-center py-4 bg-primary">
                                <strong className="text-white">Insert Product Information</strong>
                            </h5>
                            <div className="card-body px-lg-5">
                                <form className="text-center" action="/ManageProducts/insert" method="POST">
                                    <select className="mb-2 w-100" name="productFormCategoryOption" required>
                                        <option value="">---Select A Category---</option>
                                        {
                                            this.state.categories && this.state.categories.map((category, index) => 
                                                <option key={index} value={category.id}> {category.name} </option>
                                            )
                                        }
                                    </select>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormName" className="form-control" placeholder="Product name" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormPrice" className="form-control" placeholder="Product price" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormDescription" className="form-control" placeholder="Product description" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormBarcode" className="form-control" placeholder="Product barcode" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormColor" className="form-control" placeholder="Product color" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormSize" className="form-control" placeholder="Product size" required />
                                    </div>
                                    <div className="md-form mt-3 mb-4">
                                        <input type="text" name="productFormQuantity" className="form-control" placeholder="Product quantity" required />
                                    </div>
                                    <button className="btn btn-primary btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    }

                    
                    <div className="row">
                        <div className="col">
                            <table className="table table-striped table-inverse table-responsive">
                                <thead className="thead-inverse text-center">
                                    <tr>
                                        <th>ID#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Insert</th>
                                        <th>Delete</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {
                                        this.props.products.map((eachProduct, index) => (
                                            <tr key={index}>
                                                <td>{eachProduct.id}</td>
                                                <td>{eachProduct.name}</td>
                                                <td>{eachProduct.description}</td>
                                                <td>{eachProduct.price}</td>
                                                <td><button className="btn btn-warning" name="insertProductButton" onClick={(event) => this.insertProduct(event.target.name)}>Insert</button></td>
                                                <td><button className="btn btn-danger"  onClick={() => this.deleteProduct(eachProduct.id)}>Delete</button></td>
                                                <td><button className="btn btn-success" name="updateProductButton" onClick={(event) => this.updateProduct(eachProduct.id)}>Update</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {this.state.showUpdateForm && 
                            <div className="col-sm-4">
                                <div className="row justify-content-center mt-3 mb-4 mr-1">
                                    <div className="card">
                                        <h5 className="card-header text-center py-4 bg-primary">
                                            <strong className="text-white">Update Product Information</strong>
                                        </h5>
                                        <div className="card-body px-lg-5">
                                            <form className="text-center" action="/ManageProducts/update" method="POST">
                                                <div className="md-form mt-3 mb-4 d-none">
                                                    {this.state.updateProductInfo && <input type="text" name="productFormId" defaultValue={this.state.updateProductInfo.id} className="form-control" placeholder="Product id" required />}
                                                </div>
                                                <div className="md-form mt-3 mb-4">
                                                    {this.state.updateProductInfo && <input type="text" name="productFormName" defaultValue={this.state.updateProductInfo.name} className="form-control" placeholder="Product name" required />}
                                                </div>
                                                <div className="md-form mt-3 mb-4">
                                                    {this.state.updateProductInfo && <input type="text" name="productFormPrice" defaultValue={this.state.updateProductInfo.price} className="form-control" placeholder="Product price" required />}
                                                </div>
                                                <div className="md-form mt-3 mb-4">
                                                    {this.state.updateProductInfo && <input type="text" name="productFormDescription" defaultValue={this.state.updateProductInfo.description} className="form-control" placeholder="Product description" required />}
                                                </div>
                                                <div className="md-form mt-3 mb-4">
                                                    {this.state.updateProductInfo && <input type="text" name="productFormBarcode" defaultValue={this.state.updateProductInfo.bar_code} className="form-control" placeholder="Product barcode" required />}
                                                </div>
                                                <button className="btn btn-primary btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>)
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        loading: state.products.loading,
        products: state.products.products
    });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       selectProduct: selectProduct,
       requestProduct: requestProduct,
       fetchProduct: fetchProduct,
       errorProduct: errorProduct,
       deleteProduct: deleteProduct,
       addProduct: addProduct,
       updateProduct: updateProduct,
       searchProduct: searchProduct
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);



// import React, { useState, useEffect } from 'react';
// import { fetchProduct, requestProduct, deleteProduct } from "../../actions/index.js";
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// function ManageProducts(props) {
//     const [showInsertForm, setShowInsertForm]       = useState(false);
//     const [showUpdateForm, setShowUpdateForm]       = useState(false);
//     const [categories, setCategories]               = useState([]);
//     const [updateProductInfo, setUpdateProductInfo] = useState({});

//     let    loading = useSelector(state => state.products.loading);
//     let   products = useSelector(state => state.products.products);
//     const dispatch = useDispatch();

//     const fetchProductData = async () => {
//         dispatch(requestProduct());
//         let route = "/ManageProducts";
//         return (await axios.get(route)
//                     .then(response => response.data)
//                     .catch(error => console.log(error)));
//     }

//     useEffect(() => {
//         fetchProductData().then(products => {
//             dispatch(fetchProduct(products));
//         }).catch(error => console.log(error));
//     }, [loading, products, categories]);

//     const changeInsertFormStatus = () => {
//         setShowInsertForm(!showInsertForm);
//         setShowUpdateForm(false);
//     }

//     const changeUpdateFormStatus = () => {
//         setShowInsertForm(false);
//         setShowUpdateForm(!showUpdateForm);
//     }

//     const delProduct = async (id) => {
//         let route = "/ManageProducts/delete/" + id;
//         await axios.post(route).then(response => response.data.success === true && dispatch(deleteProduct(id)))
//                                 .catch(error => console.log(error));
//     }

//     const insertProduct = async (btnName) => {
//         let route = "/ManageProducts/categoryOptions";
//         await axios.get(route).then(response =>  setCategories(response.data))
//                                 .catch(error => console.log(error));
//         changeInsertFormStatus();
//     }

//     const updateProduct = async (id) => { 
//         let route = "/ManageProducts/updateProductInfo/" + id;
//         await axios.get(route).then(response => {
//                                     setUpdateProductInfo(response.data[0]);
//                                 })
//                                 .catch(error => console.log(error));
//         changeUpdateFormStatus();
//     }

//     return (
//             loading === undefined ? <div>Loading...</div> :
//             loading === false &&
//             (<div className="row justify-content-center mt-3">
//                 <div className="col-auto">
//                     {showInsertForm && 
//                     <div className="row justify-content-center mt-3 mb-4">
//                         <div className="card">
//                             <h5 className="card-header text-center py-4 bg-primary">
//                                 <strong className="text-white">Insert Product Information</strong>
//                             </h5>
//                             <div className="card-body px-lg-5">
//                                 <form className="text-center" action="/ManageProducts/insert" method="POST">
//                                     <select className="mb-2 w-100" name="productFormCategoryOption" required>
//                                         <option value="">---Select A Category---</option>
//                                         {
//                                             categories && categories.map((category, index) => 
//                                                 <option key={index} value={category.id}> {category.name} </option>
//                                             )
//                                         }
//                                     </select>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormName" className="form-control" placeholder="Product name" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormPrice" className="form-control" placeholder="Product price" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormDescription" className="form-control" placeholder="Product description" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormBarcode" className="form-control" placeholder="Product barcode" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormColor" className="form-control" placeholder="Product color" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormSize" className="form-control" placeholder="Product size" required />
//                                     </div>
//                                     <div className="md-form mt-3 mb-4">
//                                         <input type="text" name="productFormQuantity" className="form-control" placeholder="Product quantity" required />
//                                     </div>
//                                     <button className="btn btn-primary btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Save</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                     }

                    
//                     <div className="row">
//                         <div className="col">
//                             <table className="table table-striped table-inverse table-responsive">
//                                 <thead className="thead-inverse text-center">
//                                     <tr>
//                                         <th>ID#</th>
//                                         <th>Name</th>
//                                         <th>Description</th>
//                                         <th>Price</th>
//                                         <th>Insert</th>
//                                         <th>Delete</th>
//                                         <th>Update</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="text-center">
//                                     {
//                                         products.map((eachProduct, index) => (
//                                             <tr key={index}>
//                                                 <td>{eachProduct.id}</td>
//                                                 <td>{eachProduct.name}</td>
//                                                 <td>{eachProduct.description}</td>
//                                                 <td>{eachProduct.price}</td>
//                                                 <td><button className="btn btn-warning" name="insertProductButton" onClick={(event) => insertProduct(event.target.name)}>Insert</button></td>
//                                                 <td><button className="btn btn-danger"  onClick={() => delProduct(eachProduct.id)}>Delete</button></td>
//                                                 <td><button className="btn btn-success" name="updateProductButton" onClick={() => updateProduct(eachProduct.id)}>Update</button></td>
//                                             </tr>
//                                         ))
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>

//                         {showUpdateForm && 
//                             <div className="col-sm-4">
//                                 <div className="row justify-content-center mt-3 mb-4 mr-1">
//                                     <div className="card">
//                                         <h5 className="card-header text-center py-4 bg-primary">
//                                             <strong className="text-white">Update Product Information</strong>
//                                         </h5>
//                                         <div className="card-body px-lg-5">
//                                             <form className="text-center" action="/ManageProducts/update" method="POST">
//                                                 <div className="md-form mt-3 mb-4 d-none">
//                                                     {updateProductInfo && <input type="text" name="productFormId" defaultValue={updateProductInfo.id} className="form-control" placeholder="Product id" required />}
//                                                 </div>
//                                                 <div className="md-form mt-3 mb-4">
//                                                     {updateProductInfo && <input type="text" name="productFormName" defaultValue={updateProductInfo.name} className="form-control" placeholder="Product name" required />}
//                                                 </div>
//                                                 <div className="md-form mt-3 mb-4">
//                                                     {updateProductInfo && <input type="text" name="productFormPrice" defaultValue={updateProductInfo.price} className="form-control" placeholder="Product price" required />}
//                                                 </div>
//                                                 <div className="md-form mt-3 mb-4">
//                                                     {updateProductInfo && <input type="text" name="productFormDescription" defaultValue={updateProductInfo.description} className="form-control" placeholder="Product description" required />}
//                                                 </div>
//                                                 <div className="md-form mt-3 mb-4">
//                                                     {updateProductInfo && <input type="text" name="productFormBarcode" defaultValue={updateProductInfo.bar_code} className="form-control" placeholder="Product barcode" required />}
//                                                 </div>
//                                                 <button className="btn btn-primary btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Save</button>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                     </div>
//                 </div>
//             </div>)
//     )
// }

// export default ManageProducts;