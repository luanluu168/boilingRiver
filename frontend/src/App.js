import React from 'react';
import './App.css';
import Navbar from './components/nav/nav';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Footer from './components/footer/footer';
import Signin from './components/pages/signin';
import Signup from './components/pages/signup';
import ProductDetail from './containers/productDetail';
import Search from './components/search/search';
import ProductContainer from './containers/productList';
import store from './store/store';
import ManageProducts from './components/pages/manageProducts';
import Cart from './containers/cart';
import Payment from './components/pages/paymentPage';
import queryString from 'query-string';
import Error from './components/pages/error';
import Order from './containers/order';
import Receipt from './components/pages/receipt';
import Review from './components/pages/review';
import ReadOnlyReview from './components/pages/readOnlyReview';
import Landing from './components/pages/landing';
// import Sidebar from './components/sidebar/sidebar';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Navbar/>
            {/* <Sidebar /> */}
            <Switch>
              <Route exact path="/Landing">
                <Landing></Landing>
              </Route>
              <Route exact path={['/', '/api']}>
                  <Search />
                  <ProductContainer />
              </Route>
              <Route exact path="/search">
                  <Search/>
                  <ProductContainer />
              </Route>
              <Route exact path='/About'>
                  <h1>About page</h1>
              </Route>
              <Route exact path="/Products">
                  <h1>Products page</h1>
                  <ProductContainer />
              </Route>
              <Route exact path="/orders">
                  <Order />
              </Route>
              <Route exact path="/cart">
                  <Cart />
              </Route>
              <Route exact path="/Products/:id" render={({match}) => (
                  match.params.id && <ProductDetail className="product-detail-page" product={store.getState().products[match.params.id]} pId={match.params.id}/>
                )}>
              </Route>
              <Route exact path="/Signin">
                  <Signin/>
              </Route>
              <Route exact path="/Signup">
                  <Signup/>
              </Route>
              <Route exact path="/ManageProducts">
                  <Search />
                  <ManageProducts />
              </Route>
              <Route path="/Payment/:oId" render={({match}) => (
                  <Payment query={queryString.parse(match.params.oId)}/>
              )}>
              </Route>
              <Route exact path="/Receipt/:oId&pt=:paymentType" render={({match}) => (
                  <Receipt oId={match.params.oId} pt={match.params.paymentType}/>
                )}>
              </Route>
              <Route exact path="/Receipt/:oId" render={({match}) => (
                  <Receipt oId={match.params.oId}/>
                )}>
              </Route>
              <Route exact path="/Review/orderId=:oId" render={({match}) => (
                  <Review oId={match.params.oId}/>
              )}>
              </Route>
              <Route exact path="/Review/readOnlyReview/orderId=:oId&ct=:content&r=:rating" render={({match}) => (
                  <ReadOnlyReview oId={match.params.oId} content={match.params.content} rating={match.params.rating}/>
              )}>
              </Route>
              <Route exact path="/Error">
                  <Error/>
              </Route>
              <Redirect to="/Error"></Redirect>
            </Switch>
          <Footer/>
        </Router>  
    );
  }
}

export default App;
