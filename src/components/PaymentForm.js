import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { callApi } from "../axios-services";
//import axios from 'axios'
//import "../style/PaymentForm.css";

const CARD_OPTIONS = {
  /** style here? or put in App.js or PaymentForm.css */
};

const PaymentForm = ({ token }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await callApi({
          url: `api/cart/checkout`,
          method: "POST",
          token,
          data: {
            amount: 1000,
            id,
          },
        });

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("payment error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow" style={{ width: "250px" }}>
              <CardElement options={CARD_OPTIONS} style={{ width: "200px" }} />
            </div>
          </fieldset>
          <button className="button">Pay</button>
        </form>
      ) : (
        <div>
          <h4>
            Thank you for your popcorn purchase. If you're not addicted, you
            will be.
          </h4>
        </div>
      )}
    </>
  );
};

export default PaymentForm;

//import { CardElement, useElements, useStripe } from 'react-stripe-checkout'
