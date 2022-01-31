import { Link } from 'react-router-dom';
import config from '../../config';
import useFetch from "../../Services/useFetch";
import ListLoading from "./ListLoading";
import axios from "axios";

const List = () => {

	// const {data: response, isLoading} = useFetch(`${config.API_URL}/users`, 'Error fetching List Users, please try again.');

	const getMeTheList = async () => {

		const instance = axios.create({
			baseURL: 'http://localhost:8000',
			withCredentials: true,
			timeout: 100000,
		});

		const getCookie = await instance.get('/sanctum/csrf-cookie');

		console.log(getCookie);

		const tryToLogin = await instance.post(`/api/login`, {
			email: "Josherzzzz@listapp.com",
			password: "poopoo"
		});

		console.log(tryToLogin);

		const usersList = await instance.get(`/api/users`);

		console.log(usersList);
	}

	return (
		<ul className="list-group list-content">
			<button onClick={getMeTheList}>LIST UP</button>
			{/*{isLoading && <ListLoading />}*/}
			{/*{response && response.data.sort((a, b) => {*/}
			{/*	return a.ranking - b.ranking;*/}
			{/*}).map((user) => (*/}
			{/*	<div className={`list-group-item ${user.ranking === 1 ? "legendary-user" : user.ranking <= 5 ? "epic-user" : user.ranking <= 10 ? "rare-user" : ""}`} key={user.id}>*/}
			{/*		<div className="row">*/}
			{/*			<div className="col">*/}
			{/*				<strong className="mr-4">#{user.ranking}</strong>*/}
			{/*				<Link to={`/users/${user.id}`}>*/}
			{/*					{user.name}*/}
			{/*				</Link>*/}
			{/*			</div>*/}
			{/*			<div className="col-auto">*/}
			{/*				<strong>{user.points}</strong>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*))}*/}
		</ul>
	);
}

export default List;
