import {useState} from "react";

const Donate = () => {

	const [donationAmount, setDonationAmount] = useState(1);

	return (
		<div className="donate">
			<div className="card">
				<form action="" method="POST">
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