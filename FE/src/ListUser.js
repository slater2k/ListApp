import { useParams } from 'react-router-dom';
import {default as defaultConfig} from "./config/default";
import useFetch from "./Services/useFetch";
import ListUserLoading from "./LoadingTemplates/ListUserLoading"

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
										<li>
											<a target="_blank" href="#">Added 392 points</a>
											<a href="#" className="float-right">21 March, 2014</a>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
												scelerisque diam non nisi semper, et elementum lorem ornare.
												Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales
												vehicula....</p>
										</li>
										<li>
											<a target="_blank" href="#">Added 1099 points</a>
											<a href="#" className="float-right">4 March, 2014</a>
											<p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis.
												Nam pellentesque felis vitae justo accumsan, sed semper nisi
												sollicitudin...</p>
										</li>
										<li>
											<a target="_blank" href="#">Added 2382 points</a>
											<a href="#" className="float-right">1 April, 2014</a>
											<p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla
												odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec
												tempor nibh...</p>
										</li>
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
