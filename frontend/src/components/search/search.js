import React from 'react';
import { bindActionCreators } from 'redux';
import { realtimeSearch, regularSearch, clearIconOn, clearIconOff, setAutocomplete } from '../../actions';
import { connect } from 'react-redux';

class Search extends React.Component {
    getSearchText() {
        return window.$("input[name=searchText]").val();
    }

    clearSearchText() {
        window.$("input[name=searchText]").val('');
        this.props.clearIconOff();
    }

    handleAutocompleteOnClick(itemName) {
        window.$("#searchBar").val(itemName);
        this.props.realtimeSearch(itemName);
        this.props.setAutocomplete(false);
    }

    renderAvailableOptions() {
        return (
            this.props.isAutocompleteOn &&
            this.props.availableOptions?.length > 0 && 
            <ul id="clothesAutocompleteOptions">
                { this.props.availableOptions?.map((item, index) => (
                    <li key={index} value={item} onClick={() => this.handleAutocompleteOnClick(item)}>{item}</li>
                ))}
            </ul>
        );
    }

    renderClearIcon() {
        return (
            this.props.displayClearIcon &&
            <span className="remove-search-icon" onClick={() => this.clearSearchText()}><span>&#10006;</span></span>
        );
    }

    renderSearchIcon() {
        return (
            <i className="fas fa-search text-info search-icon" aria-hidden="true" />
        );
    }

    renderSearchBar() {
        return (
            <input placeholder="Real-time Search by typing in a keyword, eg: jacket, jean, or hoodie" type="text" className={ this.props.isAutocompleteOn ? "search search-on-focus" : "search" } id="searchBar" name="searchText" onChange={(event) => this.props.realtimeSearch(event.target.value)} aria-label="Search"  />
        );
    }

    renderSearch() {
        return (
            <div className='container-fluid mt-3 mb-3'>
                <div className="w-75 m-auto">
                    <div className="wrapper">
                        { this.renderSearchIcon() }
                        { this.renderSearchBar() }
                        { this.renderAvailableOptions() }
                        { this.renderClearIcon() }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderSearch()
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        displayClearIcon: state.search.displayClearIcon,
        availableOptions: state.search.availableOptions,
        isAutocompleteOn: state.search.isAutocompleteOn
    })
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        realtimeSearch: realtimeSearch,
        regularSearch: regularSearch,
        clearIconOn: clearIconOn,
        clearIconOff: clearIconOff,
        setAutocomplete: setAutocomplete
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);