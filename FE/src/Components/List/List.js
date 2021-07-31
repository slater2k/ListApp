import { Link } from 'react-router-dom';
import config from '../../config';
import useFetch from "../../Services/useFetch";
import ListLoading from "./ListLoading";

const List = () => {

	const {data: users, isLoading} = useFetch(`${config.API_URL}/users`, 'Error fetching List Users, please try again.');

	return (
		<ul className="list-group list-content">
			{isLoading && <ListLoading />}
			{users && users.map((user) => (
				<div className={`list-group-item ${user.id === 1 ? "legendary-user" : user.id <= 5 ? "epic-user" : user.id <= 10 ? "rare-user" : ""}`} key={user.id}>
					<div className="row">
						<div className="col">
							<strong className="mr-4">#{user.id}</strong>
							<Link to={`/user/${user.id}`}>
								{user.username}
							</Link>
						</div>
						<div className="col-auto">
							<strong>{user.donations.reduce((carry, donation) => {return carry + donation.points}, 0)}</strong>
						</div>
					</div>
				</div>
			))}
		</ul>
	);
}

export default List;
