import React from 'react'
import { Elements } from 'react-stripe-checkout'
//'@stripe/react-stripe-js'
import { loadStripe } from 'react-stripe-checkout'
import { PaymentForm } from './PaymentForm'

const PUBLIC_KEY = "pk_test_51KyQNZDSB6EJnrLZAtEPFc48bxyIRUohyI7V4q8RYJcE6ESvgJH3r5rW0JvmcBFOfDBhkfDjeqtzSlA2Wwz0Jfns00Kn5cL0ya"   

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = ({token}) => {

    return (

        <Elements stripe={stripeTestPromise} >
            <PaymentForm token={token}/>
        </Elements>
    )

}

export default StripeContainer;