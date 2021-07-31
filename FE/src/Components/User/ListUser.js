import { useParams } from 'react-router-dom';
import {default as defaultConfig} from "../../config/default";
import useFetch from "../../Services/useFetch";
import ListUserLoading from "./ListUserLoading"

const ListUser = () => {
	const { userId } = useParams();

	/**
	 * Lets not pass data around in context (sorry)
	 * Config seems like the perfect use for it rather than users
	 * --
	 * My idea is we do a lightweight search on the list, then a deeper context search per user (kinda like vision with search/detail views)
	 * //todo we could cache the last 15 users the user has clicked on in session storage
	 */
	const {data: user, isLoading} = useFetch(`${defaultConfig.API_URL}/users/`+userId, 'Error fetching User, please try again.');

	return (
		<div className="profile page">
			{isLoading && <ListUserLoading/>}
			{user && <div className="profile-wrapper row gutters">
				<div className="profile-user col-4">
					<div className="card h-100">
						<div className="card-body">
							<div className="profile-user-preamble text-center pb-3">
								{/*eventually have user profile picture here*/}
								<div className="user-avatar mb-3"><img src="https://picsum.photos/200/300/" alt="" /></div>
								<h5 className="user-name">{user.username}</h5>
								<div className="user-rank">#{user.id}</div>
								<div className="user-email d-block mb-1">{100 - user.id}</div>
							</div>
							<div className="profile-user-information text-center mt-3">
								<div className="user-email d-block mb-1">{user.email}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="profile-content col-8">
					<div className="card h-100">
						<div className="card-body">
							<h5>Score History</h5>
							<div className="row">
								<div className="col">
									<ul className="timeline">
										{user.donations.map((donation) => {
											return (
												<li key={donation.id}>
													<a target="_blank" href="#">Added {donation.points} points</a>
													{/* shoud use published_at instead but idk why thats null */}
													<a href="#" className="float-right">{donation.created_at}</a>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
														scelerisque diam non nisi semper, et elementum lorem ornare.
														Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales
														vehicula....</p>
												</li>
											)
										})}
									</ul>
								</div>
							</div>
						</div>
						<div className="card-body">
							<div className="text-right">
								<button type="button" id="submit" name="submit"
										className="btn btn-danger mr-1">Report User
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>}
		</div>
	);
}

export default ListUser;
