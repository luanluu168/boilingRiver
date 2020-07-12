import React from 'react';

class ReviewStar extends React.Component {
    state = {
        value: 4
    }

    handleClick(value) {
        this.setState({value: value});
    }

    render() {
        return (
            <div>
                <span className={this.state.value >= 1 ? `fa fa-star text-warning` : `fa fa-star`} id="star1" onClick={() => this.handleClick(1)}></span>
                <span className={this.state.value >= 2 ? `fa fa-star text-warning` : `fa fa-star`} id="star2" onClick={() => this.handleClick(2)}></span>
                <span className={this.state.value >= 3 ? `fa fa-star text-warning` : `fa fa-star`} id="star3" onClick={() => this.handleClick(3)}></span>
                <span className={this.state.value >= 4 ? `fa fa-star text-warning` : `fa fa-star`} id="star4" onClick={() => this.handleClick(4)}></span>
                <span className={this.state.value >= 5 ? `fa fa-star text-warning` : `fa fa-star`} id="star5" onClick={() => this.handleClick(5)}></span>
            </div>
        );
    }
}

export default ReviewStar;
