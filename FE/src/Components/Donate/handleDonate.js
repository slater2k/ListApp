import * as yup from "yup";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";

const handleDonate = async function (e, config, auth) {
    e.preventDefault();

    // Check user is logged in
    if (!auth.jwt) {
        // TODO: let them register here
        await Swal.fire({
            text: 'You must be logged in to donate!',
            icon: 'error',
            confirmButtonText: 'ok :('
        })

        return;
    }
    const jwt = auth.jwt;

    // Validate input
    const userInput = {
        pennies: e.target.pennies.value
    };
    let schema = yup.object().shape({
        pennies: yup.number().required().positive().integer()
    })

    if (!await schema.isValid(userInput)) {
        await Swal.fire({
            text: 'Invalid amount of money entered!',
            icon: 'error',
            confirmButtonText: 'Cool'
        })

        return;
    }

    // POST /donations
    let response = await fetch(`${config.API_URL}/donations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
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

export default handleDonate;
