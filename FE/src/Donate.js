import {useState} from "react";
import { loadStripe } from '@stripe/stripe-js';

const Donate = () => {

	const [donationAmount, setDonationAmount] = useState(250);

    const handleDonate = async (e) => {
		e.preventDefault();

        // Check user is logged in

        // Validate input
		const pennies = e.target.pennies.value;

        // POST /donations { price: 69 }
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5NTUwOTgwLCJleHAiOjE2MjIxNDI5ODB9.TCGDfwLe2blaU8njxMuP5GZ-zYlkXO2pS2iqI10wR0Y';
		let response = await fetch(`http://localhost:13337/donations`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				price: pennies
			})
		});

        // Try to redirect to stripe checkout
		response = await response.json();
		const checkoutSession = response.checkout_session;

        try {
            const stripePromise = loadStripe('pk_test_51If4ugLhl4Z9YEbRVqfuTZsAvRwCzqkJc29h0ikx3yVFQgSigKtFj5yg3kpbfKy7jFmUGvc7G7z4LL4fpAHcwkAu00SGzefzfH');
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: checkoutSession });
        } catch(e) {
            console.log(e);
        }
    };

	return (
		<div className="donate">
			<div className="card">
				<form action="" method="POST" onSubmit={handleDonate} >
					<div className="card-header">Donate!</div>
					<div className="card-body">
						<div className="input-group mb-3">
							<label id="donation-amount" htmlFor="donation-slider" className="form-label d-block w-100 text-center">{donationAmount}</label>
							<input type="range" className="form-range d-block w-100" name="pennies" min="1" max="500" id="donation-slider" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} />
						</div>

						<div className="input-group">
							<input type="submit" value="Donate!" className="btn btn-success d-block mt-3 m-auto"/>
						</div>
					</div>
					<div className="card-footer">Sponsored by Jalex 🙌</div>
				</form>
			</div>
		</div>
	);
}

export default Donate;