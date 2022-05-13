import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { callApi } from "../axios-services";
import { Snackbar } from "./Snackbar";
import "../style/PaymentForm.css";
import "../style/Cart.css";
import axios from "axios"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const PaymentForm = ({ setMessage, token, setMyCart, orderId }) => {
  const history = useHistory();
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
        const response = await axios.post("/payment", {
          amount: 1000,
          id
        })

        if (response.data.success) {
          console.log("successful payment");
          setMessage("Payment Successful")
          Snackbar();
          
        }
      } catch (error) {
        console.log("payment error", error);
      }

      try {
        const completeOrder = await callApi({
          url: `/api/orders/${orderId}`,
          method: "PATCH",
          token,
          data: {
            status: 'completed'
          }
        })
        console.log('completeOrder', completeOrder);
        localStorage.removeItem("guestCart");
        localStorage.setItem('guestCart', JSON.stringify({products: []}));
        setMessage('Thank You For Your Order');
        Snackbar();
        history.push('/')
      } catch(error) {
        throw error
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <form>
        <fieldset className="FormGroup">
          <div className="FormRow" style={{ width: "250px" }}>
            <CardElement options={CARD_OPTIONS} style={{ width: "200px" }} />
          </div>
        </fieldset>
      </form>
      <button className="button" onClick={handleSubmit}>Pay</button>
    </>
  );
};

export default PaymentForm;

// //import { CardElement, useElements, useStripe } from 'react-stripe-checkout'

// return (
//   <>
//     {!success ? (
//       <form onSubmit={handleSubmit}>
//         <fieldset className="FormGroup">
//           <div className="FormRow" style={{ width: "250px" }}>
//             <CardElement options={CARD_OPTIONS} style={{ width: "200px" }} />
//           </div>
//         </fieldset>
//         <button className="button">Pay</button>
//       </form>
//     ) : (
//       <div>
//         <h4>
//           Thank you for your popcorn purchase. If you're not addicted, you
//           will be.
//         </h4>
//       </div>
//     )}
//   </>
// );
