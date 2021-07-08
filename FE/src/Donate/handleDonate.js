import * as yup from "yup";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import {ConfigContext} from "../Contexts/ConfigContext";
import {useContext} from "react";

export default async function (e) {
    const config = useContext(ConfigContext);

    e.preventDefault();

    // Check user is logged in

    // Validate input
    const userInput = {
        pennies: e.target.pennies.value
    };
    let schema = yup.object().shape({
        pennies: yup.number().required().positive().integer()
    })

    if (!await schema.isValid(userInput)) {
        Swal.fire({
            text: 'Invalid amount of money entered!',
            icon: 'error',
            confirmButtonText: 'Cool'
        })

        return;
    }

    // POST /donations
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NTUwOTgwLCJleHAiOjE2MjIxNDI5ODB9.TCGDfwLe2blaU8njxMuP5GZ-zYlkXO2pS2iqI10wR0Y';
    let response = await fetch(`${config.API_URL}/donations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            price: userInput.pennies
        })
    });

    // Try to redirect to stripe checkout
    response = await response.json();
    const checkoutSession = response.checkout_session;

    try {
        const stripePromise = loadStripe(config.STRIPE.PUBLIC_KEY);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: checkoutSession });
    } catch(e) {
        console.error(e);
    }
};
