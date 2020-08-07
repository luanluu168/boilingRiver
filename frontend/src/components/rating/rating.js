import React from 'react';

// readonly rating
function Rating(props) {
  return (
      !props.value ? (<div></div>) : 
      (<div className="text-warning">
          <span>
            <i className={ props.value >= 1 ? 'fa fa-star' : props.value >= 0.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ props.value >= 2 ? 'fa fa-star' : props.value >= 1.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ props.value >= 3 ? 'fa fa-star' : props.value >= 2.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ props.value >= 4 ? 'fa fa-star' : props.value >= 3.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>
            <i className={ props.value >= 5 ? 'fa fa-star' : props.value >= 4.5 ? 'fa fa-star-half-o' : '' } ></i>
          </span>
          <span>{ props.text ? props.text : ''}</span>
        </div>
      )
  )
}

export default Rating;
