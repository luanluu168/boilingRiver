require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("stripeErr: ", stripeErr);
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

function postStripe(req, res) {
    stripe.customers.create({ 
        email: "TestEmail@gmail.com", 
        source: req.body.id, 
        name: req.params.name, 
        address: { 
            line1: '50 Felan', 
            postal_code: '94112', 
            city: 'San Francisco', 
            state: 'CA', 
            country: 'USA', 
        },
        phone: req.params.phone
    }) 
    .then((customer) => { 
        return stripe.charges.create({ 
            amount: req.params.amount * 100,     // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'usd',
            customer: customer.id
        }, stripeChargeCallback(res)); 
    }); 
}

module.exports = postStripe;