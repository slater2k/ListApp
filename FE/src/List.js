import { Link } from 'react-router-dom';

const List = ({fakeListData}) => {

	/**
	 * Sort function to re-arrange data by highest to lowest list_rank
	 * @param a
	 * @param b
	 * @returns {number}
	 */
	function compareRank( a, b ) {
		if ( a.list_rank < b.list_rank ) {return -1;}
		if ( a.list_rank > b.list_rank ) {return 1;}
		return 0;
	}

	fakeListData.sort( compareRank );

	return (
		<ul className="list-group list-content">
			{fakeListData.map((listItem) => (
				<div className={`list-group-item ${listItem.list_rank === 1 ? "legendary-user" : listItem.list_rank <= 5 ? "epic-user" : listItem.list_rank <= 10 ? "rare-user" : ""}`} key={listItem.list_rank}>
					<div className="row">
						<div className="col">
							<strong className="mr-4">#{listItem.list_rank}</strong>
							<Link to={`/User/${listItem.id}`}>
								{listItem.first_name} {listItem.last_name}
							</Link>
						</div>
						<div className="col-auto">
							<strong>{listItem.score}</strong>
						</div>
					</div>
				</div>
			))}
		</ul>
	);
}

export default List;
