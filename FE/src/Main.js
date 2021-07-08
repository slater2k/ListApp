import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import Donate from "./Donate/";
import ListUser from "./ListUser";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import { useState } from 'react';
import { ConfigContext } from "./Contexts/ConfigContext";
import { default as defaultConfig } from './config/default';

function Main() {

    const [config, setConfig] = useState(defaultConfig);

    return (
        <Router>
            <ConfigContext.Provider value={{config, setConfig}}>
                <div id="main-container" className="container">
                    <Navigation />
                    <div className="content-inner">
                        <Switch>
                            <Route exact path="/">
                                <List />
                            </Route>
                            <Route path="/user/:userId">
                                <ListUser />
                            </Route>
                            <Route path="/account">
                                <Account />
                            </Route>
                            <Route path="/donate">
                                <Donate />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </ConfigContext.Provider>
            <div className="dynamic-background-wrapper">
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>
        </Router>
    );
}

export default Main;
