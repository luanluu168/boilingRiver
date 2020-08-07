import React, { useState } from 'react';

function ReviewStar(props) {
    const [value, setValue] = useState(4);

    const handleClick = (value) => {
        setValue(value);
    }

    return (
        <div>
            <span className={value >= 1 ? `fa fa-star text-warning` : `fa fa-star`} id="star1" onClick={() => handleClick(1)}></span>
            <span className={value >= 2 ? `fa fa-star text-warning` : `fa fa-star`} id="star2" onClick={() => handleClick(2)}></span>
            <span className={value >= 3 ? `fa fa-star text-warning` : `fa fa-star`} id="star3" onClick={() => handleClick(3)}></span>
            <span className={value >= 4 ? `fa fa-star text-warning` : `fa fa-star`} id="star4" onClick={() => handleClick(4)}></span>
            <span className={value >= 5 ? `fa fa-star text-warning` : `fa fa-star`} id="star5" onClick={() => handleClick(5)}></span>
        </div>
    )
}

export default ReviewStar;
