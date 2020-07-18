import React from 'react';
import { bindActionCreators } from 'redux';
import { realtimeSearch, regularSearch, clearIconOn, clearIconOff } from '../../actions';
import { connect } from 'react-redux';

class Search extends React.Component {
    getSearchText() {
        return window.$("input[name=searchText]").val();
    }

    clearSearchText() {
        window.$("input[name=searchText]").val('');
        this.props.clearIconOff();
    }

    render() {
        return (
            <div className='container-fluid mt-3 mb-3'>
                <div className="w-75 m-auto">
                    <div className="wrapper">
                        <i className="fas fa-search text-info search-icon" aria-hidden="true" />
                        <input placeholder="Real-time Search by typing in a keyword, eg: jacket, jean, or hoodie" type="text" className="search" name="searchText" onChange={(event) => this.props.realtimeSearch(event.target.value)} aria-label="Search"  />
                        {/* <button className="btn search-button" type="button" onClick={() => this.props.regularSearch(this.getSearchText())}><i className="fas fa-search text-primary" aria-hidden="true" /></button> */}
                        { this.props.displayClearIcon ? <span className="remove-search-icon" onClick={() => this.clearSearchText()}><span>&#10006;</span></span> : <span></span> }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        displayClearIcon: state.search.displayClearIcon
    })
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        realtimeSearch: realtimeSearch,
        regularSearch: regularSearch,
        clearIconOn: clearIconOn,
        clearIconOff: clearIconOff
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);