import { Link } from 'react-router-dom';

const Login = () => {

	// Todo - build actual login mechanism

	return (
		<div className="login-account-wrapper">
			<h4 className="card-title text-center mb-4">Log in to ListApp</h4>
			<form id="login">

				<div className="form-group input-group">
					<div className="input-group-prepend">
						<span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
					</div>
					<input name="" className="form-control" placeholder="Email address" type="email" />
				</div>

				<div className="form-group input-group">
					<div className="input-group-prepend">
						<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
					</div>
					<input className="form-control" placeholder="Password" type="password" />
				</div>

				<div className="form-group">
					<button type="submit" className="btn btn-primary btn-block">Log in</button>
					<a href="" className="btn btn-block btn-facebook" title="Log in with Facebook"> <i className="fab fa-facebook-f"></i> With facebook</a>
					<a href="" className="btn btn-block btn-twitter" title="Log in with Twitter"> <i className="fab fa-twitter"></i> With Twitter</a>
				</div>
			</form>
			<Link className="text-center d-block" to={`/register`}>
				<small>Don't have an account? Click here!</small>
			</Link>
		</div>
	);
}

export default Login;