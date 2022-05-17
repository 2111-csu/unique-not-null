import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51KyQNZDSB6EJnrLZAtEPFc48bxyIRUohyI7V4q8RYJcE6ESvgJH3r5rW0JvmcBFOfDBhkfDjeqtzSlA2Wwz0Jfns00Kn5cL0ya"   

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = ({ token, setMessage, orderId, setMyCart }) => {

    return (

        <Elements stripe={stripeTestPromise} >
            <PaymentForm 
            setMessage={setMessage} 
            orderId={orderId} 
            setMyCart={setMyCart} 
            token={token}/>
        </Elements>
    )

}

export default StripeContainer;
