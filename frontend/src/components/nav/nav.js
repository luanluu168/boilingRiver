import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Cookie from 'js-cookie';
import { bindActionCreators } from 'redux';
import { addToCart, fetchCookieItemToCart } from '../../actions';

class Navbar extends React.Component {
    componentDidMount() {
      if(this.props.cart.length === 0) {
        const cookieCartItems = Cookie.getJSON('cartInfo') ? Cookie.getJSON('cartInfo') : [];
        this.props.fetchCookieItemToCart(cookieCartItems);
      } 
    }
    
    render() {
      let userName = Cookie.getJSON('userLoginInfo') ? Cookie.getJSON('userLoginInfo').name : '';
      let userRole = Cookie.getJSON('userLoginInfo') ? Cookie.getJSON('userLoginInfo').role : '';
      
      return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="main-navbar">
            <Link id="webBrand" className="navbar-brand" to="/Landing"> BoilingRiver </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarToggler">
                <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link" to="/" id="home-link"> Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders" id="order-link"> Order</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link m-auto" to="/Cart" id="cart-link">{this.props.cart.length !== 0 && <span className="badge badge-danger rounded-circle" id="cartCount">{this.props.cart.length}</span>} Cart</Link>
                  </li>
                  <li className="nav-item">
                    { userRole === 'manager' && <Link className="nav-link" to="/ManageProducts" id="manage-product-link"> Manage Products</Link> }
                  </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <div className="btn-group">
                      <button type="button" className="btn btn-dark dropdown-toggle dropdown-toggle-split text-white-50" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="navbar-auth-button">
                        { Cookie.get("userLoginInfo") && <p className="d-inline mr-2">Hi, {userName}</p> }<i className="fas fa-user mr-2"></i>
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/Signup">Sign-up</Link>
                        { !Cookie.get("userLoginInfo") ? (<Link className="dropdown-item" to="/Signin">Sign-in</Link>) :
                          (<form action="/Auth/Signout" method="POST"><button className="dropdown-item" type="submit">Sign-out</button></form>)
                        }
                      </div>
                    </div>
                </ul>
            </div>
        </nav>
      );
    }
}

const mapStateToProps = (state) => {
  return ({
    cart: state.cart.cart
  });
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addToCart: addToCart,
    fetchCookieItemToCart: fetchCookieItemToCart
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);