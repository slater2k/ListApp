import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import ListUser from "./ListUser";
import { useEffect, useState } from 'react';

function Main() {    
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await (await fetch('http://127.0.0.1:13337/users')).json();
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
            <Navigation />
            <div id="main-container" className="container">
                <div className="content-inner pt-3 pb-5">
                    <Switch>
                        <Route exact path="/">
                            <List fakeListData={users} />
                        </Route>
                        <Route path="/user/:userId">
                            <ListUser fakeListData={users} />
                        </Route>
                        <Route path="/account">
                            <Account />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Main;
