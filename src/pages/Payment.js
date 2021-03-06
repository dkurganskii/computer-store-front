import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
    return (
        <div className='container p-5 text-center' >
            <Elements stripe={promise}>
                <div className='col-md-8 offset-md-2'>
                    <StripeCheckout />
                </div>
            </Elements>
            <br />
            <p>*Please use the following test credit card for payments*</p>
            <p>4242 4242 4242 4242 - Exp: Any future date - CVV: Any 3 digits</p>
        </div>
    )
}

export default Payment
