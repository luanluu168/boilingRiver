import React from 'react';

// readonly rating
class Rating extends React.Component {
  render() {
    return (
      !this.props.value ? (<div></div>) : 
      (<div className="text-warning">
          <span>
            <i className={ this.props.value >= 1 ? 'fa fa-star' : this.props.value >= 0.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ this.props.value >= 2 ? 'fa fa-star' : this.props.value >= 1.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ this.props.value >= 3 ? 'fa fa-star' : this.props.value >= 2.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ this.props.value >= 4 ? 'fa fa-star' : this.props.value >= 3.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ this.props.value >= 5 ? 'fa fa-star' : this.props.value >= 4.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>{ this.props.text ? this.props.text : ''}</span>
        </div>
      ));
  }
}

export default Rating;
