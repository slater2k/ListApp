import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from "react";
import { ConfigContext } from "./Contexts/ConfigContext";
import { AuthContext } from "./Contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {config} = useContext(ConfigContext);
    const {dispatchAuth} = useContext(AuthContext);
    const history = useHistory();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        // validate input
        const loginDetails = {
            'identifier': email,
            'password': password
        }

        // send login request
        let response = await fetch(`${config.API_URL}/auth/local`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginDetails),
        });

        response = await response.json();

        // dispatch
        dispatchAuth({
            'type': 'LOGIN',
            'user': response.user,
            'jwt': response.jwt,
        })

        // redirect user to home
        history.push('/');
    };

    return (
        <div className="login-account-wrapper">
            <h4 className="card-title text-center mb-4">Log in to ListApp</h4>
            <form id="login" onSubmit={handleSubmitLogin}>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input name="" className="form-control" placeholder="Email address" type="email"
                           onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input className="form-control" placeholder="Password" type="password"
                           onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    <a href="#" className="btn btn-block btn-facebook" title="Log in with Facebook"> <i
                        className="fab fa-facebook-f"></i> With facebook</a>
                    <a href="#" className="btn btn-block btn-twitter" title="Log in with Twitter"> <i
                        className="fab fa-twitter"></i> With Twitter</a>
                </div>
            </form>
            <Link className="text-center d-block" to={`/register`}>
                <small>Don't have an account? Click here!</small>
            </Link>
        </div>
    );
}

export default Login;
