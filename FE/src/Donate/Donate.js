import {useContext, useState} from "react";
import handleDonate from "./handleDonate";
import { AuthContext } from "../Contexts/AuthContext";
import { ConfigContext } from "../Contexts/ConfigContext";

const Donate = () => {
	const getDonationTier = (donationAmount) => {
		return Math.floor(donationAmount / 100) > 5 ? 5 : Math.floor(donationAmount / 100);
	}

	const handleDonationSlider = async (e) => {
		setDonationAmount(e.target.value)
		setTreasureChest(getDonationTier(donationAmount));
	}

	const {auth} = useContext(AuthContext);
	const {config} = useContext(ConfigContext);
	const [donationAmount, setDonationAmount] = useState(250);
	const [treasureChest, setTreasureChest] = useState(getDonationTier(donationAmount));

	return (
		<div className="donate">
			<div className="card">
				<form action="" method="POST" onSubmit={(e) => {handleDonate(e, config, auth)}} >
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
