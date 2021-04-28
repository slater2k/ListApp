import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import Donate from "./Donate";
import ListUser from "./ListUser";
import Login from "./Login";
import { useEffect, useState } from 'react';
import { UsersContext } from './Contexts/UsersContext';

function Main() {    
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await (await fetch('http://listapp-api.glhf.lol:13337/users')).json();
        let counter = 1;
        setUsers(res.map((user) => {
            return {
                "id": user.id,
                "first_name": user.username,
                "last_name": "", // TODO do we want last names or just usernames
                "email": user.email,
                "profile_image": "http://dummyimage.com/198x196.bmp/ff4444/ffffff",
                "ip_address": "",
                "list_rank": counter++, // TODO this is a dummy rank
                "score": 100 - counter // TODO this is a dummy score
            }
        }));
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Router>
            <UsersContext.Provider value={{users, setUsers}}>
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
                        </Switch>
                    </div>
                </div>
            </UsersContext.Provider>
        </Router>
    );
}

export default Main;
