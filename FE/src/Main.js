import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from "./Components/Navigation";
import List from "./Components/List";
import Account from "./Components/Account/Account";
import Donate from "./Components/Donate/";
import User from "./Components/User";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./NotFound";
import { useEffect, useReducer } from 'react';
import { ConfigContext } from "./Contexts/ConfigContext";
import { default as defaultConfig } from './config/default';
import { AuthContext } from './Contexts/AuthContext';

let initialAuthState = {
    user: null,
    jwt: null,
};

// On first load, check localStorage to see if the user is logged in or not
if(localStorage.getItem('jwt')) {
    try {
        initialAuthState = {
            'user': JSON.parse(localStorage.getItem('user')),
            'jwt': localStorage.getItem('jwt'),
        };
    } catch (e) {
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.user));
            localStorage.setItem("jwt", action.jwt);
            return {
                user: action.user,
                jwt: action.jwt
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                user: null,
                jwt: null
            };
        default:
            return state;
    }
};

function Main() {
    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const loadLoginState = async () => {
            if (auth.jwt) {
                // Refresh auth.user
                let userResponse = await fetch(`${defaultConfig.API_URL}/users/${auth.user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.jwt}`
                    },
                });
                let user = await userResponse.json();

                dispatchAuth({
                    'action': 'LOGIN',
                    'jwt': auth.jwt,
                    'user': user
                });
            }
        };

        loadLoginState();
    }, [auth?.jwt , auth?.user?.id]);

    return (
        <Router>
            <AuthContext.Provider value={{auth, dispatchAuth}}>
                <ConfigContext.Provider value={{config: defaultConfig}}>
                    <div id="main-container" className="container">
                        <Navigation/>
                        <div className="content-inner">
                            <Switch>
                                <Route exact path="/">
                                    <List/>
                                </Route>
                                <Route path="/users/:userId">
                                    <User/>
                                </Route>
                                <Route path="/account">
                                    <Account/>
                                </Route>
                                <Route path="/donate">
                                    <Donate/>
                                </Route>
                                <Route path="/login">
                                    <Login/>
                                </Route>
                                <Route path="/register">
                                    <Register/>
                                </Route>
                                <Route path="*">
                                    <NotFound/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </ConfigContext.Provider>
            </AuthContext.Provider>
            <div className="dynamic-background-wrapper">
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>
        </Router>
    );
}

export default Main;
