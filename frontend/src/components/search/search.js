import React from 'react';
import { bindActionCreators } from 'redux';
import { realtimeSearch, regularSearch } from '../../actions';
import { connect } from 'react-redux';

class Search extends React.Component {
    getSearchText() {
        return window.$("input[name=searchText]").val();
    }

    render() {
        this.getSearchText();
        return (
            <div className='container-fluid mt-3 mb-3'>
                {/* <form className="w-75 m-auto" action="/search/searchText=:" method="GET"> */}
                <div className="w-75 m-auto">
                    <div className="input-group md-form form-sm form-2 pl-0">
                        <input className="flex-grow-1 border border-info" type="text" name="searchText" onChange={(event) => this.props.realtimeSearch(event.target.value)} placeholder="Real-time Search by typing in a keyword, eg: jacket, jean, or hoodie" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark" type="button" onClick={() => this.props.regularSearch(this.getSearchText())}><i className="fas fa-2x fa-search text-primary" aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        searchProducts: state.products.products
    })
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        realtimeSearch: realtimeSearch,
        regularSearch: regularSearch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);