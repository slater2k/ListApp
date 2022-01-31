import { Link } from 'react-router-dom';
import config from '../../config';
import useFetch from "../../Services/useFetch";
import ListLoading from "./ListLoading";

const List = () => {

	const {data: response, isLoading} = useFetch(`${config.API_URL}/users`, 'Error fetching List Users, please try again.');

	return (
		<ul className="list-group list-content">
			{isLoading && <ListLoading />}
			{response && response.data.sort((a, b) => {
				return a.ranking - b.ranking;
			}).map((user) => (
				<div className={`list-group-item ${user.ranking === 1 ? "legendary-user" : user.ranking <= 5 ? "epic-user" : user.ranking <= 10 ? "rare-user" : ""}`} key={user.id}>
					<div className="row">
						<div className="col">
							<strong className="mr-4">#{user.ranking}</strong>
							<Link to={`/users/${user.id}`}>
								{user.name}
							</Link>
						</div>
						<div className="col-auto">
							<strong>{user.points}</strong>
						</div>
					</div>
				</div>
			))}
		</ul>
	);
}

export default List;
