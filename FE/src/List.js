import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { default as defaultConfig } from './config/default';
import useFetch from "./Services/useFetch";
import ListLoading from "./LoadingTemplates/ListLoading";

const List = () => {

	const {data: users, isLoading, error} = useFetch(`${defaultConfig.API_URL}/users`, 'Error fetching List Users, please try again.');

	return (
		<ul className="list-group list-content">
			{isLoading && <ListLoading />}
			{users && users.map((user) => (
				<div className={`list-group-item ${user.id === 1 ? "legendary-user" : user.id <= 5 ? "epic-user" : user.id <= 10 ? "rare-user" : ""}`} key={user.id}>
					<div className="row">
						<div className="col">
							<strong className="mr-4">#{user.id}</strong>
							<Link to={`/User/${user.id}`}>
								{user.username}
							</Link>
						</div>
						<div className="col-auto">
							{/*fudge the points for now*/}
							<strong>{100 - user.id}</strong>
						</div>
					</div>
				</div>
			))}
		</ul>
	);
}

export default List;
