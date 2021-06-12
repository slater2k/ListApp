import {useContext, useState} from "react";
import { loadStripe } from '@stripe/stripe-js';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import {ConfigContext} from "./Contexts/ConfigContext";

const Donate = () => {
	const { config } = useContext(ConfigContext);
	const getDonationTier = (donationAmount) => {
		return Math.floor(donationAmount / 100) > 5 ? 5 : Math.floor(donationAmount / 100);
	}

	const [donationAmount, setDonationAmount] = useState(250);

	const [treasureChest, setTreasureChest] = useState(getDonationTier(donationAmount));

    const handleDonate = async (e) => {
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

	const handleDonationSlider = async (e) => {
		setDonationAmount(e.target.value)
		setTreasureChest(getDonationTier(donationAmount));
	}

	return (
		<div className="donate">
			<div className="card">
				<form action="" method="POST" onSubmit={handleDonate} >
					<div className="card-header">Donate!</div>
					<div className="card-body">
						<div className="input-group mb-3">
							<div className={`chest-${treasureChest} treasure-chest`}></div>
							<label id="donation-amount" htmlFor="donation-slider" className="form-label d-block w-100 text-center">{donationAmount}</label>
							<input type="range" className="form-range d-block w-100" name="pennies" min="1" max="500" id="donation-slider" value={donationAmount} onChange={handleDonationSlider} />
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
