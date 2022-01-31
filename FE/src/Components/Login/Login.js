import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from "react";
import { ConfigContext } from "../../Contexts/ConfigContext";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";

const Login = () => {

    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true,
        timeout: 1000,
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {config} = useContext(ConfigContext);
    const {dispatchAuth} = useContext(AuthContext);
    const history = useHistory();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        // const getCookie = await instance.get('/sanctum/csrf-cookie');
        //
        // console.log(getCookie);
        //
        // const tryToLogin = await instance.post(`/api/login`, {
        //     email: "Josherzzzz@listapp.com",
        //     password: "poopoo"
        // });
        //
        // console.log(tryToLogin);

        // instance.get('/sanctum/csrf-cookie').then(response => {
        //     console.log(response);
        // }).then(() => {
        //
        //     fetch(`http://127.0.0.1:8000/api/login`, {
        //         method:"POST",
        //         email: "Josherzzzz@listapp.com",
        //         password: "poopoo"
        //     }).then(loginResponse => {
        //
        //         console.log(loginResponse);
        //
        //         if(loginResponse.data.success) {
        //             console.log(loginResponse);
        //         }
        //         else {
        //             alert("wrong creds yo");
        //         }
        //
        //     });
        // });
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
