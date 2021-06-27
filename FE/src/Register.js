import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Register = () => {

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

        // whos left this dirty exposed url 👀 - defo roper
        await fetch('http://localhost:13337/auth/local/register', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(createAccountParams),
        });

        history.push('/');
    };

    return (
        <div className="create-account-wrapper">
            <h4 className="card-title text-center mb-4">Create an Account</h4>
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
            <Link className="text-center d-block" to={`/login`}>
                <small>Already have an account? Click here!</small>
            </Link>
        </div>
    );
}

export default Register;