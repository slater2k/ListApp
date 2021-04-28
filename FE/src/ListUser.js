import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { UsersContext } from './Contexts/UsersContext';

const ListUser = () => {
	const { userId } = useParams();
	let [user, setUser] = useState({
		profile_image: 'loading',
		first_name: 'loading',
		last_name: 'loading',
		rank: 'loading',
		score: 'loading',
		email: 'loading',
		ip_address: 'loading',
	});

	const fetchUser = async (userId) => {
		let response = await fetch(`http://listapp-api.glhf.lol:13337/users/${userId}`)
		let user = await response.json();
		return user;
	};

	useEffect(async () => {
		setUser(await fetchUser(userId));
	}, []);

	return (
		<div className="row gutters">
			<div className="profile-user col-4">
				<div className="card h-100">
					<div className="card-body">
						<div className="profile-user-preamble text-center pb-3">
							<div className="user-avatar mb-3"><img src={user.profile_image} alt="" /></div>
							<h5 className="user-name">{user.first_name} {user.last_name}</h5>
							<div className="user-rank">#{user.list_rank}</div>
							<div className="user-email d-block mb-1">{user.score}</div>
						</div>
						<div className="profile-user-information text-center mt-3">
							<div className="user-email d-block mb-1">{user.email}</div>
							<div className="user-email d-block mb-1">{user.ip_address}</div>
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
		</div>
	);
}

export default ListUser;