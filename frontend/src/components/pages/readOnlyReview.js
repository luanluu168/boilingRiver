
import React from 'react';
import axios from 'axios';

class ReadOnlyReview extends React.Component {
    state = {
        review: []
    }

    componentDidMount() {
        this.fetchData().then(response => this.setState({review: response})).catch(error => console.log(error));
    }

    async fetchData() {
        let route1 = `/Review/write/orderId=${this.props.oId}&ct=${this.props.content}&r=${this.props.rating}`;
        let route2 = `/Review/readOnlyReview/orderId=${this.props.oId}&ct=${this.props.content}&r=${this.props.rating}`;
        return (await axios.get(route1).then(response =>{
                    return axios.get(route2).then(res => {
                                return res.data;
                            }).catch(error => console.log(error))
                }).catch(error => error));
    }

    render() {
        return (
            <div>
                <div>
                    <div className="row justify-content-center">
                        <h3 className="mb-3 mt-3">Read product review</h3>
                    </div>
                    { (this.state.review == null) ?
                        (<div className="row justify-content-center">There is no review for this product yet, want to be the first one to review for the product?</div>)
                        :
                        (
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <div className="row justify-content-center">
                                        <div className="col">
                                            <label><b>Review# </b>
                                        </label></div>
                                        <div className="col-md-7">
                                        <label name="reviewText"><b> Review Content </b>
                                        </label></div>
                                        <div className="col-md-3">
                                        <label name="reviewRank"><b> Rating </b>
                                        </label></div>
                                    </div> 
                                    {this.state.review.map((eachReview, index) => 
                                        <div key={index} className="row justify-content-center">
                                            <div className="col">
                                                <label> {index+1} 
                                                </label></div>
                                            <div className="col-md-7">
                                                <p className="text-wrap" style={{width: '30rem'}} name="reviewText"> {eachReview.review_content} </p>
                                            </div>
                                            <div className="col-md-3">
                                                <label name="reviewRank"> {eachReview.rank}
                                                </label></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>     
        );
    }
}

export default ReadOnlyReview;