import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Login = () => {

	const history = useHistory();
	const [createUsername, setCreateUsername] = useState('');
	const [createEmail, setCreateEmail] = useState('');
	const [createPassword, setCreatePassword] = useState('');
	const [createVerifyPassword, setCreateVerifyPassword] = useState('');

	const handleCreateAccount = async (e) => {
		e.preventDefault();
		const createAccountParams = {
			"username": createUsername,
			"email": createEmail,
			"password": createPassword,
			"confirmed": true // Maybe set true after email validation in future?
		};

		await fetch('http://localhost:13337/auth/local/register', {
			method: 'POST',
			headers: {"Content-Type" : "application/json"},
			body: JSON.stringify(createAccountParams),
		});

		history.push('/');
	};

	return (
		<div className="login">
			<div className="login-wrapper card border-0 mx-auto">
				<article className="card-body p-0">
					<h4 className="card-title text-center">Log in to ListApp</h4>
					<p>
						<a href="" className="btn btn-block btn-facebook mb-3" title="Log in via Facebook"> <i className="fab fa-facebook-f"></i> Via facebook</a>
						<a href="" className="btn btn-block btn-twitter" title="Log in via Twitter"> <i className="fab fa-twitter"></i> Via Twitter</a>
					</p>
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
						</div>
					</form>

					<p className="divider-text">
						<span className="bg-light">OR</span>
					</p>

					<h4 className="card-title text-center">Create an Account</h4>

					<form id="createAccount" onSubmit={handleCreateAccount}>
						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-user"></i> </span>
							</div>
							<input name="" className="form-control" placeholder="Username" type="text" onChange={(e) => setCreateUsername(e.target.value)} required />
						</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
							</div>
							<input name="" className="form-control" placeholder="Email address" type="email" onChange={(e) => setCreateEmail(e.target.value)} required />
						</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
							</div>
							<input className="form-control" placeholder="Create password" type="password" onChange={(e) => setCreatePassword(e.target.value)} required/>
						</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
								<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
							</div>
							<input className="form-control" placeholder="Repeat password" type="password" onChange={(e) => setCreateVerifyPassword(e.target.value)} required/>
						</div>

						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">Create Account</button>
						</div>
					</form>
				</article>
			</div>
		</div>
	);
}

export default Login;