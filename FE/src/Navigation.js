import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Navigation = () => {
    // move this key into a config file

    const fetchCheckout = async () => {
        // Check user is logged in

        // Validate input

        // POST /donations { price: 69 }

        // Try to redirect to stripe checkout

        // need to update the create donation callback to both create a donation and return the checkout session ID
        const donationId = 5;
        try {
        // move this endpoint into a config file
            const response = await fetch(`http://localhost:13337/donations/create-checkout/${donationId}`);
            const res = await response.json();
            const stripePromise = loadStripe('pk_test_51If4ugLhl4Z9YEbRVqfuTZsAvRwCzqkJc29h0ikx3yVFQgSigKtFj5yg3kpbfKy7jFmUGvc7G7z4LL4fpAHcwkAu00SGzefzfH');
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: res.checkout_session });
        } catch(e) {
            console.log(e);
        }
    };

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container">
				<div className="navbar-brand">List App</div>
				<div className="links">
					<ul className="navbar-nav">

                        {/* TODO move this into its own component.  It's just here for testing the checkout */}
                        {/*<li className="nav-item">*/}
                        {/*    <form action="#">*/}
                        {/*        <input type="range" name="price" id="price" min="0" max="1000" step="1" />*/}
                        {/*        <button type="button" id="checkout-button" onClick={fetchCheckout}>Checkout</button>*/}
                        {/*    </form>*/}
                        {/*</li>*/}

						<li className="nav-item active">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/account">Account</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/donate">Donate to the cause!</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
