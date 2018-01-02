import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
                name="Email Service"
                description="$5 for 5 email credits"
                // 500 cents
                amount={500}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}

export default Payments;
