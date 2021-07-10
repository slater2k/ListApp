import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import Donate from "./Donate/";
import ListUser from "./ListUser";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { useReducer } from 'react';
import { ConfigContext } from "./Contexts/ConfigContext";
import { default as defaultConfig } from './config/default';
import { AuthContext } from './Contexts/AuthContext';

function Main() {


    let initialAuthState = {
        user: null,
        jwt: null,
    };

    // On first load, check localStorage to see if the user is logged in or not
    if(localStorage.getItem('jwt')) {
        initialAuthState = {
            'user': JSON.parse(localStorage.getItem('user')),
            'jwt': localStorage.getItem('jwt'),
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

    const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState);

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
                                <Route path="/user/:userId">
                                    <ListUser/>
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
