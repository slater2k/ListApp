import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="navbar-brand">List App</div>
			<div className="links">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<Link className="nav-link" to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/account">Account</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;