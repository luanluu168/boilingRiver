import React from 'react';

function BillingDetailFields(props) {
  return (
    <div>
        <div className="FormRow">
          <label htmlFor="name" className="FormRowLabel mb-0">Name</label>
          <input className="FormRowInput" id="cardOwnerName" type="text" placeholder="eg: La La" required />
        </div>
        <div className="FormRow">
          <label htmlFor="phone" className="FormRowLabel mb-0">Phone</label>
          <input className="FormRowInput" id="cardOwnerPhone" type="number" placeholder="eg: 415 070 9394" required />
        </div>
    </div>
    
  );
};
export default BillingDetailFields;