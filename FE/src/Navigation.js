import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContext";

const Navigation = () => {
	const {auth} = useContext(AuthContext)

	return (
		<nav className="navbar navbar-expand-lg navbar-light py-4">
			<div className="container px-0">
				<div className="navbar-brand">
                    <Link to='/'>ListApp 🥳</Link>
                </div>
				<div className="links">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						{
							auth.jwt !== null ?
							<li className="nav-item">
								<Link className="nav-link" to="/account">Account</Link>
							</li>
							:
							<li className="nav-item">
								<Link className="nav-link" to="/login">Log in</Link>
							</li>
						}
						<li className="nav-item">
							<Link className="nav-link pr-0" to="/donate">Donate to the cause!</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
