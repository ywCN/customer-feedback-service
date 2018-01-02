import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        // debugger;
        return (
            <StripeCheckout
                name="Email Service"
                description="$5 for 5 email credits"
                // 500 cents
                amount={500}
                // handleToken is one of the action creator
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                {/* override default button */}
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

// connect this component to action creators in order to update state
export default connect(null, actions)(Payments);
