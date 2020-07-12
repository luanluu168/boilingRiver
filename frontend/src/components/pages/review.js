
import React from 'react';
import { Link } from 'react-router-dom';

class Review extends React.Component {
    state = {
        content: '',
        rating: 0
    }

    handleInputContent(content) {
        this.setState({content: content});
    }

    handleInputRating(rating) {
        this.setState({rating: rating});
    }

    render() {
        return (
            <div>
                <div className="form-group row justify-content-center">
                <h3 className="mb-3 mt-3" >Write the product review</h3>
                </div>
                <div className="row justify-content-center">
                <ul className="list-group mb-3">
                    <textarea className="mb-3" wrap="hard" name="ct" rows={5} cols={30} placeholder="Start writing..." required onChange={(event) => this.handleInputContent(event.target.value)} />
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <label>Rate for the product</label>
                    <input className="form-control w-25" name="r" placeholder="#1 to 5" required onChange={(event) => this.handleInputRating(event.target.value)}/>
                    </li>
                </ul>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        {this.state.content !== '' && (this.state.rating >= 1 && this.state.rating <= 5) && <Link to={`/Review/readOnlyReview/orderId=${this.props.oId}&ct=${this.state.content}&r=${this.state.rating}`} className="w-75"><button className="btn btn-primary rounded-pill" type="button">Save</button></Link>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Review;